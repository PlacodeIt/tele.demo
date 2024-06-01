import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["telegram_messages"]
collection = db["messages"]

# Add a message to the database
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

# View messages in the database
def view_messages():
    messages = collection.find()
    for message in messages:
        print(message)

# Edit a message in the database
def edit_message(message_id, new_message_text):
    collection.update_one({"message_id": message_id}, {"$set": {"message_text": new_message_text}})
    print("Message updated successfully.")

# Delete a message from the database
def delete_message(message_id):
    collection.delete_one({"message_id": message_id})
    print("Message deleted successfully.")

if __name__ == '__main__':
    # Message for testing
    fake_message = {
        "message_text": "This is a fake message.",
        "message_id": 123456789,
        "chat_title": "Test Chat",
        "chat_id": 987654321,
        "chat_username": "test_user"
    }

    # Tests
    add_message(**fake_message)
    view_messages()
    edit_message(fake_message["message_id"], "This is an edited message.")
    view_messages()
    delete_message(fake_message["message_id"])
    view_messages()
