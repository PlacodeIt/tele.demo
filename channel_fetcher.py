from telethon import TelegramClient, functions
import configparser

# Load the configuration
config = configparser.ConfigParser()
config.read('config.ini')

api_id = config['telegram']['api_id']
api_hash = config['telegram']['api_hash']
print(f"API ID: {api_id}")
print(f"API ID: {api_hash}")

# Create the client and connect
client = TelegramClient('tele1', int(api_id), api_hash)

async def fetch_channels_with_query(query):
    """ Fetch channels that match the query."""
    await client.start()
    result = await client(functions.contacts.SearchRequest(
        q=query,
        limit=15
    ))

    channels_list = []
    for chat_id, chat in enumerate(result.chats):
        print(f"[{chat_id + 1}/{len(result.chats)}] "
              f"Channel ID: {chat.id}, "
              f"Title: {chat.title}, "
              f"Username: @{chat.username}")
        channels_list.append((chat.id, chat.title))

    return channels_list

async def main():
    query = "gaza"
    await fetch_channels_with_query(query)

if __name__ == "__main__":
    client.loop.run_until_complete(main())
