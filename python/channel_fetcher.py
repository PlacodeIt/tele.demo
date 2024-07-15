from db import add_chat
import configparser
from telethon import TelegramClient, functions, errors
from telethon.tl.functions.channels import GetFullChannelRequest
from collections import defaultdict
import logging
import asyncio
from functools import wraps
import signal
import time
import os
import json
import pandas as pd

# Load the configuration
config = configparser.ConfigParser()
config.read('config.ini')

api_id = config['telegram']['api_id']
api_hash = config['telegram']['api_hash']
query = config['telegram']['query']

# Create the Telegram client with the session name 'tele.demo'
client = TelegramClient('tele.demo', api_id, api_hash)

# Setup logging to omit the date
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Customize logging format to exclude the date
class CustomFormatter(logging.Formatter):
    converter = time.gmtime

    def formatTime(self, record, datefmt=None):
        ct = self.converter(record.created)
        if datefmt:
            s = time.strftime(datefmt, ct)
        else:
            t = time.strftime("%H:%M:%S", ct)
            s = "%s,%03d" % (t, record.msecs)
        return s

    def format(self, record):
        record.message = record.getMessage()
        record.asctime = self.formatTime(record, self.datefmt)
        if record.levelname == 'INFO' and 'Processing Chat' in record.message:
            record.message = record.message.replace("Chat ID: ", "Processing Chat, Title: ")
            record.message = ','.join(record.message.split(',')[1:])
        return "%(asctime)s %(message)s" % record.__dict__

formatter = CustomFormatter()
for handler in logger.handlers:
    handler.setFormatter(formatter)

# Dictionary to keep track of seen chat IDs
seen_chats = defaultdict(bool)

# Create the downloads folder if it doesn't exist
downloads_folder = os.path.join(os.getcwd(), 'downloads')
if not os.path.exists(downloads_folder):
    os.makedirs(downloads_folder)

# Path to the data file
json_file_path = os.path.join(downloads_folder, f'{query}.json')
excel_file_path = os.path.join(downloads_folder, f'{query}.xlsx')

# Function to load existing data from the JSON file
def load_existing_data():
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            return json.load(file)
    return []

# Function to save data to the JSON file
def save_data_to_json(data):
    with open(json_file_path, 'w') as file:
        json.dump(data, file, indent=4)

# Function to save data to an Excel file
def save_data_to_excel(data):
    df = pd.DataFrame(data)
    df.to_excel(excel_file_path, index=False)

# Load existing data
existing_data = load_existing_data()

# Update the seen_chats dictionary with the existing data
for chat in existing_data:
    seen_chats[chat['chat_id']] = True

# Check if chat exists in MongoDB
def is_exist_db(chat_id, collection_name):
    from pymongo import MongoClient
    client = MongoClient("mongodb://localhost:27017/")
    db = client["telegram_messages"]
    collection = db[collection_name]
    return collection.find_one({"chat_id": chat_id}) is not None

def is_exist(chat_id):
    return seen_chats[chat_id] or is_exist_db(chat_id, query)

def mark_chat_exist(chat_id):
    seen_chats[chat_id] = True

def retry_on_error(retries=3, delay=5):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(retries):
                try:
                    return await func(*args, **kwargs)
                except errors.FloodWaitError as e:
                    logger.warning(f"FloodWaitError: waiting for {e.seconds} seconds before retrying...")
                    await asyncio.sleep(e.seconds)
                except Exception as e:
                    logger.warning(f"Error: {e}. Retrying in {delay} seconds...")
                    await asyncio.sleep(delay)
            raise Exception("Max retries reached")
        return wrapper
    return decorator

@retry_on_error()
async def fetch_channels_with_query(query, limit):
    """Fetch channels and groups that match the query and get detailed information."""

    logger.info(f"\nStarting to fetch channels and groups with query: {query}")

    start_time = time.time()
    downloaded_count = 0
    skipped_count = 0
    
    try:
        result = await client(functions.contacts.SearchRequest(
            q=query,
            limit=limit  # Use the user-defined limit
        ))
        logger.info(f"\nSearch request completed. Number of chats found: {len(result.chats)}")

        channels_list = []
        chat_count = 0
        for chat in result.chats:
            if is_exist(chat.id):
                skipped_count += 1
                continue
            mark_chat_exist(chat.id)

            chat_type = "channel" if chat.broadcast else "group"
            logger.info(f"Processing Chat ID: {chat.id}, Title: {chat.title}, Type: {chat_type}")
            channels_list.append((chat.id, chat.title))
            chat_count += 1
            downloaded_count += 1

            # Fetch detailed information about the channel or group
            try:
                full_channel = await client(GetFullChannelRequest(channel=chat))
                full_info = full_channel.full_chat

                # Prepare chat information dictionary
                chat_info = {
                    "chat_id": full_info.id,
                    "title": chat.title,
                    "about": full_info.about,
                    "participants_count": full_info.participants_count,
                    "admins_count": full_info.admins_count,
                    "kicked_count": full_info.kicked_count,
                    "banned_count": full_info.banned_count,
                    "online_count": full_info.online_count,
                    "read_inbox_max_id": full_info.read_inbox_max_id,
                    "read_outbox_max_id": full_info.read_outbox_max_id,
                    "unread_count": full_info.unread_count,
                    "type": chat_type
                }

                # Add chat information to the database using the query as collection name
                add_chat(chat_info, query)
                existing_data.append(chat_info)  # Append new data to the list

            except Exception as e:
                logger.error(f"Error fetching full channel info for chat ID {chat.id}: {e}")

        if skipped_count > 0:
            logger.info(f"\nChats already exist: {skipped_count}")

    except Exception as e:
        logger.error(f"Error during fetch_channels_with_query: {e}")

    finally:
        end_time = time.time()
        elapsed_time = end_time - start_time
        logger.info(f"\nFinished fetching channels and groups with query: {query}")
        logger.info(f"Total chats processed: {chat_count}")
        logger.info(f"Total time taken: {elapsed_time:.2f} seconds")
        logger.info(f"Total chats downloaded: {downloaded_count}")
        logger.info(f"Total chats skipped: {skipped_count}")
        save_data_to_json(existing_data)  # Save data to JSON file
        save_data_to_excel(existing_data)  # Save data to Excel file
        await client.disconnect()

async def shutdown_signal_handler():
    logger.info("Received termination signal, asking for confirmation...")
    response = input("Are you sure you want to exit? (y/n): ").strip().lower()
    if response == 'y':
        logger.info("User confirmed exit. Shutting down...")
        for task in asyncio.all_tasks():
            task.cancel()
        asyncio.get_event_loop().stop()
    else:
        logger.info("Continuing execution.")

async def run_with_retries(client, max_retries=3):
    for attempt in range(max_retries):
        try:
            async with client:
                await main()
            break
        except errors.FloodWaitError as e:
            logger.warning(f"Flood wait error: Waiting for {e.seconds} seconds before retrying...")
            await asyncio.sleep(e.seconds)
        except Exception as e:
            logger.error(f"Attempt {attempt + 1} failed: {e}")
            if attempt + 1 == max_retries:
                logger.error("Max retries reached. Exiting.")
                break
            logger.info("Retrying...")

async def main():
    # Ask the user for the limit of searches
    while True:
        try:
            limit = int(input("Enter the limit of searches (max 100000000): "))
            if 1 <= limit <= 100000000:
                break
            else:
                print("Please enter a number between 1 and 100000000.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

    await fetch_channels_with_query(query, limit)

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Register the signal handler for graceful shutdown
    for signame in ('SIGINT', 'SIGTERM'):
        signal.signal(getattr(signal, signame), lambda signame, frame: asyncio.create_task(shutdown_signal_handler()))

    try:
        loop.run_until_complete(run_with_retries(client))
    except (KeyboardInterrupt, SystemExit):
        loop.run_until_complete(shutdown_signal_handler())
        loop.run_until_complete(asyncio.sleep(0.1))  # Allow all tasks to cancel
    finally:
        loop.close()
