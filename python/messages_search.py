from channel_fetcher import client, fetch_channels_with_query
import asyncio
from db_handler import add_message, add_channel_info, add_sender_info, is_message_exist

async def search_for_word_in_query(word, query):
    """
    Search for a word in a query in all channels that match the query and
    return the messages that contain the word.
    """
    word_lower = word.lower() 
    print(f"@@@@@ Fetching Channels w/ query: {query}")
    channels_list = await fetch_channels_with_query(query)

    print(f"@@@@@ Fetching Messages w/ query: {query}")
    messages_list = []
    for channel_id, channel_title in channels_list:
        print(f"@@@@ Searching in {channel_title}...")
        async for message in client.iter_messages(channel_id, search=word_lower, limit=15):
            message_text_lower = message.text.lower() if message.text else ""
            print(f"Found '{word}' in message {message.id} in {channel_title}")
            if message.photo:
                media_type = "photo"
            elif message.video:
                media_type = "video"
            else:
                media_type = "text"

            message_info = {
                "message_text": message_text_lower,
                "message_id": message.id,
                "chat_title": channel_title,
                "chat_id": channel_id,
                "chat_username": message.sender.username if message.sender else None,
                "message_link": f"https://t.me/{channel_title}/{message.id}",
                "media_type": media_type,
                "date": message.date 
            }
            
            # Avoid duplicate & Add message to the database
            if not is_message_exist(message.id):
                add_message(message_info['message_text'], message_info['message_id'], message_info['chat_title'], message_info['chat_id'], message_info['chat_username'], message_info['media_type'], message_info['date'])
                add_sender_info(message_info['chat_username'])
                add_channel_info(message_info['chat_id'], {"title": channel_title, "type": "channel" if message.is_channel else "group"})

            messages_list.append(message_info)

    return channels_list, messages_list

async def main():
    query = "gaza"
    word = "zionist"

    messages = await search_for_word_in_query(word, query)
    for message in messages[1]:  
        print(message)

if __name__ == "__main__":
    client.loop.run_until_complete(main())
