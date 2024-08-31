from telethon.sync import TelegramClient
import configparser
from telethon.tl.functions.contacts import SearchRequest
from pymongo import MongoClient
from langdetect import detect, LangDetectException
'''
Program Explanation
TelegramClient: Connects to the Telegram API.
SearchRequest: Searches for channels with the word "Gaza" in their name.
get_messages: Retrieves messages containing the word "Zionist" from the identified channels.
pymongo: Stores the retrieved messages in a MongoDB database.
4. Usage
Replace YOUR_API_ID, YOUR_API_HASH, and YOUR_PHONE_NUMBER with your Telegram API credentials.
Run the script to connect to Telegram, search for channels, retrieve messages, and store them in MongoDB.
This script will store the channel's name, channel ID, message ID, message text, and the date the message was sent in MongoDB.
'''
# Telegram API credentials
# Load the configuration
config = configparser.ConfigParser()
config.read('config.ini')

api_id = config['telegram']['api_id']
api_hash = config['telegram']['api_hash']
query = config['telegram']['query']
phone_number = config['telegram']['phone']

# Search parameters
channel_search_term = 'fuck jews'  # Channel search term, easily changeable
message_search_term = 'and'  # Message search term, easily changeable

# MongoDB connection
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['telegram_data']
collection = db['test_1']

# Function to search for channels and retrieve messages
def fetch_and_store_messages():
    with TelegramClient(phone_number, api_id, api_hash) as client:
        print("Connected to Telegram.")
        
        # Search for channels with the specified term in their name
        print(f"Searching for channels containing '{channel_search_term}' in their name...")
        result = client(SearchRequest(q=channel_search_term, limit=100))
        channels = [chat for chat in result.chats if chat.megagroup]
        
        print(f"Found {len(channels)} channels. Processing messages...")
        
        for channel in channels:
            print(f"Fetching messages from channel: {channel.title} (ID: {channel.id})")
            
            # Retrieve messages containing the specified search term
            messages = client.get_messages(channel, search=message_search_term, limit=100)
            print(f"Retrieved {len(messages)} messages containing '{message_search_term}'. Filtering non-English messages...")
            
            for message in messages:
                try:
                    # Detect language and exclude non-English messages
                    if message.message:
                        lang = detect(message.message)
                        if lang == 'en':
                            # Store messages in MongoDB
                            collection.insert_one({
                                'channel_name': channel.title,
                                'channel_id': channel.id,
                                'message_id': message.id,
                                'message_text': message.message,
                                'date': message.date
                            })
                            print(f"Stored message ID {message.id} from channel {channel.title}.")
                        else:
                            print(f"Skipping non-English message ID {message.id} (detected language: {lang}).")
                except LangDetectException:
                    print(f"Language detection failed for message ID {message.id}. Skipping message.")
                    continue

if __name__ == '__main__':
    print("Starting Telegram message fetcher...")
    fetch_and_store_messages()
    print("Message fetching and storing complete.")