import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["telegram_messages"]
collection = db["messages"]

# Function to add a message to the database
def add_message(message_text, message_id, chat_title, chat_id, chat_username):
    message = {
        "message_text": message_text,
        "message_id": message_id,
        "chat_title": chat_title,
        "chat_id": chat_id,
        "chat_username": chat_username
    }
    collection.insert_one(message)
    print("Message added successfully.")

# Function to view all messages
def view_messages():
    messages = collection.find()
    for message in messages:
        print(message)

# Function to edit a message
def edit_message(message_id, new_message_text):
    collection.update_one({"message_id": message_id}, {"$set": {"message_text": new_message_text}})
    print("Message updated successfully.")

# Function to delete a message
def delete_message(message_id):
    collection.delete_one({"message_id": message_id})
    print("Message deleted successfully.")

# Fake message for testing
fake_message = {
    "message_text": "This is a fake message.",
    "message_id": 123456789,
    "chat_title": "Test Chat",
    "chat_id": 987654321,
    "chat_username": "test_user"
}

# Add the fake message to the database
add_message(**fake_message)

# View all messages in the database
view_messages()

# Edit the fake message
edit_message(fake_message["message_id"], "This is an edited message.")

# View all messages in the database after editing
view_messages()

# Delete the fake message
delete_message(fake_message["message_id"])

# View all messages in the database after deleting
view_messages()
