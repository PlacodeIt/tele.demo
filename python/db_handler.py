import pymongo
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["tele_data"]  # Use "tele_data" as the database name

# Add channel/group to the database
def add_chat(chat_info, collection_name):
    collection = db[collection_name]
    result = collection.update_one(
        {"chat_id": chat_info["chat_id"]},
        {"$set": chat_info},
        upsert=True
    )
    if result.upserted_id:
        logger.info(f"Chat {chat_info['chat_id']} ({chat_info['type']}) added successfully in collection '{collection_name}'.")
    else:
        logger.info(f"Chat {chat_info['chat_id']} ({chat_info['type']}) updated successfully in collection '{collection_name}'.")

# Add message to the database
def add_message(message_info):
    collection = db["tele_messages"]
    result = collection.update_one(
        {"message_id": message_info["message_id"]},
        {"$set": message_info},
        upsert=True
    )
    if result.upserted_id:
        logger.info(f"Message {message_info['message_id']} added successfully.")
    else:
        logger.info(f"Message {message_info['message_id']} updated successfully.")

# Add channel information to the database
def add_channel_info(chat_id, chat_info):
    collection = db["tele_messages_sources"]
    result = collection.update_one(
        {"chat_id": chat_id},
        {"$set": chat_info},
        upsert=True
    )
    if result.upserted_id:
        logger.info(f"Channel info for chat {chat_id} added successfully.")
    else:
        logger.info(f"Channel info for chat {chat_id} updated successfully.")

# Add sender info to the database
def add_sender_info(sender_id, sender_info):
    collection = db["tele_messages_senders"]
    result = collection.update_one(
        {"sender_id": sender_id},
        {"$set": sender_info},
        upsert=True
    )
    if result.upserted_id:
        logger.info(f"Sender ID {sender_id} added successfully.")
    else:
        logger.info(f"Sender ID {sender_id} updated successfully.")

# Check if message exists in the database
def is_message_exist(message_id):
    collection = db["tele_messages"]
    return collection.find_one({"message_id": message_id}) is not None

# Check if chat exists in the database
def is_exist_db(chat_id, collection_name):
    collection = db[collection_name]
    return collection.find_one({"chat_id": chat_id}) is not None

# View all messages in the messages collection
def view_messages():
    collection = db["tele_messages"]
    messages = collection.find()
    for message in messages:
        print(message)

if __name__ == '__main__':
    # Example for testing
    example_message = {
        "message_text": "This is a test message.",
        "message_id": 1,
        "chat_title": "Test Chat",
        "chat_id": 123456789,
        "chat_username": "test_user",
        "media_type": "text",
        "date": datetime.utcnow()
    }

    # Test functions
    add_message(example_message)
    view_messages()
