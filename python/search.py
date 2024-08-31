from channel_fetcher import client, fetch_channels_with_query
import asyncio
from db import add_message

async def search_for_word_in_query(word, query):
    """
    Search for a word in a query in all channels that match the query and
    return the messages that contain the word.
    """

    print(f"@@@@@ Fetching Channels w/ query: {query}")
    channels_list = await fetch_channels_with_query(query, limit=10)

    print(f"@@@@@ Fetching Messages w/ query: {query}")
    messages_list = []
    for channel_id, channel_title in channels_list:
        print(f"@@@@ Searching in {channel_title}...")
        async for message in client.iter_messages(channel_id, search=word, limit=15):
            print(f"Found '{word}' in message {message.id} in {channel_title}")  # : {message.text}")
            
            # Determine the media type
            if message.photo:
                media_type = "photo"
            elif message.video:
                media_type = "video"
            else:
                media_type = "text"
            
            messages_list.append({
                "message_text": message.text,
                "message_id": message.id,
                "chat_title": channel_title,
                "chat_id": channel_id,
                "chat_username": message.sender.username if message.sender else None,
                "message_link": f"https://t.me/{channel_title}/{message.id}",
                "media_type": media_type,
                "date": message.date 
            })
            
            # Add message to the database
            add_message(message.text, message.id, channel_title, channel_id, message.sender.username if message.sender else None, media_type, message.date)

    return channels_list, messages_list

async def main():
    query = "zionist"
    word = "zionist"

    messages = await search_for_word_in_query(word, query)
    for message in messages[1]:  # messages[1] contains the messages_list
        print(message)

if __name__ == "__main__":
    client.loop.run_until_complete(main())
