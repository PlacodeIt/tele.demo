import pymongo
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["telegram_messages"]

# Add a chat to the database
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

# Add a message to the database
def add_message(message_text, message_id, chat_title, chat_id, chat_username, media_type):
    message = {
        "message_text": message_text,
        "message_id": message_id,
        "chat_title": chat_title,
        "chat_id": chat_id,
        "chat_username": chat_username,
        "media_type": media_type
    }
    collection = db["messages"]
    result = collection.update_one(
        {"message_id": message_id},
        {"$set": message},
        upsert=True
    )
    if result.upserted_id:
        logger.info(f"Message {message_id} added successfully.")
    else:
        logger.info(f"Message {message_id} updated successfully.")

# View all chats in a specific collection in the database
def view_chats(collection_name):
    collection = db[collection_name]
    chats = collection.find()
    for chat in chats:
        print(chat)

# View all messages in the messages collection
def view_messages():
    collection = db["messages"]
    messages = collection.find()
    for message in messages:
        print(message)

if __name__ == '__main__':
    # Example message for testing
    example_message = {
        "message_text": "This is a test message.",
        "message_id": 1,
        "chat_title": "Test Chat",
        "chat_id": 123456789,
        "chat_username": "test_user",
        "media_type": "text"
    }

    # Test functions
    add_message(**example_message)
    view_messages()
