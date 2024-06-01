from telethon import TelegramClient, events, sync, functions, types
import asyncio
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

api_id = 20195144  # config['telegram']['api_id'] https://my.telegram.org/
api_hash = "1df6d7ef94ce3d1dbb45bcc65e6443d6"  # config['telegram']['api_hash']

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
