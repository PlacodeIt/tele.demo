from telethon import TelegramClient, events, sync, functions, types
import asyncio
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

api_id = config['telegram']['api_id']
api_hash = config['telegram']['api_hash']

client = TelegramClient('tele1', int(api_id), api_hash)


async def channels(query):
    await client.start()
    result = await client(functions.contacts.SearchRequest(
        q=query,
        limit=15
    ))
    channels_list = []
    for chat in result.chats:
        print(f"Channel ID: {chat.id}, Title: {chat.title}, Username: @{chat.username}")
        channels_list.append((chat.id, chat.title))
        
    return channels_list

'''
4test
async def main():
    query = "gaza"  
    await channels(query)

if __name__ == "__main__":
    client.loop.run_until_complete(main())
'''