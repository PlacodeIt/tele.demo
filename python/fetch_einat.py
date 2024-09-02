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
from telethon.sync import TelegramClient  # Import TelegramClient to connect and interact with the Telegram API
import configparser  # Import configparser to read configuration data from the config file
from telethon.tl.functions.contacts import SearchRequest  # Import SearchRequest to search for Telegram channels
from pymongo import MongoClient  # Import MongoClient to interact with MongoDB
from langdetect import detect, LangDetectException  # Import language detection tools to filter messages based on language

# Telegram API credentials
config = configparser.ConfigParser()  # Create a ConfigParser object to handle configuration file reading
config.read('config.ini')  # Read the configuration file 'config.ini'

# Extract Telegram API credentials and search parameters from the config file
api_id = config['telegram']['api_id']  # Your API ID from Telegram
api_hash = config['telegram']['api_hash']  # Your API hash from Telegram
query = config['telegram']['query']  # Search query parameter (can be used in the code)
phone_number = config['telegram']['phone']  # Your phone number associated with the Telegram account

# Search parameters
channel_search_term = 'palestine'  # The term used to search for channels (can be easily changed)
message_search_term = 'Israeli occupation'  # The term used to search within messages in the identified channels

# MongoDB connection
mongo_client = MongoClient('mongodb://localhost:27017/')  # Connect to MongoDB running locally
db = mongo_client['telegram_data']  # Select (or create) the database 'telegram_data'
collection = db['train_data_0_1']  # Select (or create) the collection 'anti_1' within the 'telegram_data' database

# Function to search for channels and retrieve messages
def fetch_and_store_messages(add_label=False):  # The function accepts a parameter to control whether to add a label field
    with TelegramClient(phone_number, api_id, api_hash) as client:  # Establish a connection to the Telegram API
        print("Connected to Telegram.")
        
        # Search for channels with the specified term in their name
        print(f"Searching for channels containing '{channel_search_term}' in their name...")
        result = client(SearchRequest(q=channel_search_term, limit=200))  # Search for channels using the search term
        channels = [chat for chat in result.chats if chat.megagroup]  # Filter the results to include only mega groups
        
        print(f"Found {len(channels)} channels. Processing messages...")
        
        for channel in channels:  # Loop through each found channel
            print(f"Fetching messages from channel: {channel.title} (ID: {channel.id})")
            
            # Retrieve messages containing the specified search term
            messages = client.get_messages(channel, search=message_search_term, limit=200)  # Search for messages in the channel
            print(f"Retrieved {len(messages)} messages containing '{message_search_term}'. Filtering non-English messages...")
            
            for message in messages:  # Loop through each message in the channel
                try:
                    # Detect language and exclude non-English messages
                    if message.message:  # Ensure the message has text content
                        lang = detect(message.message)  # Detect the language of the message
                        if lang == 'en':  # Only process English messages
                            # Prepare the message data to be stored in MongoDB
                            message_data = {
                                'channel_name': channel.title,  # Store the name of the channel
                                'channel_id': channel.id,  # Store the ID of the channel
                                'message_id': message.id,  # Store the ID of the message
                                'message_text': message.message,  # Store the text of the message
                                'date': message.date,  # Store the date the message was sent
                            }
                            
                            # Add the label field if requested
                            if add_label:  # Check if the label field should be added
                                label = 1  # Set the label value (adjust as needed)
                                message_data['label'] = label  # Add the label to the message data

                            # Store the message in the MongoDB collection
                            collection.insert_one(message_data)  # Insert the message data into MongoDB
                            print(f"Stored message ID {message.id} from channel {channel.title}.")
                        else:
                            print(f"Skipping non-English message ID {message.id} (detected language: {lang}).")  # Skip non-English messages
                except LangDetectException:  # Handle cases where language detection fails
                    print(f"Language detection failed for message ID {message.id}. Skipping message.")
                    continue  # Skip to the next message

if __name__ == '__main__':  # This block runs if the script is executed directly
    print("Starting Telegram message fetcher...")
    
    # Call the function with add_label=True to include label, or False to exclude
    fetch_and_store_messages(add_label=True)  # Change to False if you don't want to add labels
    
    print("Message fetching and storing complete.")  # Indicate that the process is complete
