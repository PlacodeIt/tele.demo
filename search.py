from maintele import client, channels
import asyncio

async def search_for_zionists_in_channels(query):
    channels_list = await channels(query)  
    for channel_id, channel_title in channels_list:
        print(f"Searching in {channel_title}...")
        async for message in client.iter_messages(channel_id, search='zionists', limit=15):
            print(f"Found 'zionists' in message {message.id} in {channel_title}: {message.text}")

async def main():
    query = "gaza"
    await search_for_zionists_in_channels(query)

if __name__ == "__main__":
    client.loop.run_until_complete(main())