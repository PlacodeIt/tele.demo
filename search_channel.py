import configparser
import asyncio
import os
import sys
from telethon.sync import TelegramClient
from telethon.errors.rpcerrorlist import ChannelInvalidError
from telethon import TelegramClient
from telethon.tl.functions.channels import GetFullChannelRequest
from telethon.tl.types import MessageEntityUrl, MessageEntityTextUrl, MessageMediaPhoto, MessageMediaDocument
from pymongo import MongoClient
from datetime import datetime, timedelta

# Read configuration from config.ini
config = configparser.ConfigParser()
config.read('config.ini')

api_id = config['telegram']['api_id']
api_hash = config['telegram']['api_hash']
phone = config['telegram']['phone']

# Ensure media download path exists
media_download_path = './downloaded_media/'
os.makedirs(media_download_path, exist_ok=True)

client = TelegramClient('tele.demo', api_id, api_hash)

async def fetch_channel_details(channel_name):
    try:
        await client.start()
        entity = await client.get_entity(channel_name)
        full_channel = await client(GetFullChannelRequest(channel=entity))

        channel_info = {
            'id': full_channel.full_chat.id,
            'title': entity.title,
            'about': full_channel.full_chat.about,
            'participants_count': full_channel.full_chat.participants_count or 0,
            'admins_count': full_channel.full_chat.admins_count or 0,
            'kicked_count': full_channel.full_chat.kicked_count or 0,
            'banned_count': full_channel.full_chat.banned_count or 0,
            'online_count': full_channel.full_chat.online_count or 0,
            'read_inbox_max_id': full_channel.full_chat.read_inbox_max_id,
            'read_outbox_max_id': full_channel.full_chat.read_outbox_max_id,
            'unread_count': full_channel.full_chat.unread_count
        }

        print("Channel details fetched successfully.")

        mongo_client = MongoClient('mongodb://localhost:27017/')
        db = mongo_client.telegram_messages

        db.channels.update_one(
            {'id': channel_info['id']},
            {'$set': channel_info},
            upsert=True
        )

        print("Channel details inserted/updated in MongoDB.")

        date_one_week_ago = datetime.now() - timedelta(weeks=1)

        async for message in client.iter_messages(entity, offset_date=date_one_week_ago):
            has_media = message.media is not None
            media_type = None
            media_path = None

            if has_media:
                if isinstance(message.media, MessageMediaPhoto):
                    media_type = 'photo'
                    media_path = await client.download_media(message.media, file=media_download_path)
                elif isinstance(message.media, MessageMediaDocument):
                    if any(attr.mime_type.startswith('video/') for attr in message.media.document.attributes if hasattr(attr, 'mime_type')):
                        media_type = 'video'
                    else:
                        media_type = 'document'
                    media_path = await client.download_media(message.media, file=media_download_path)

            has_links = any(isinstance(entity, (MessageEntityUrl, MessageEntityTextUrl)) for entity in message.entities or [])

            message_info = {
                'message_id': message.id,
                'message_text': message.message,
                'date': message.date,
                'sender_id': message.sender_id,
                'has_media': has_media,
                'media_type': media_type,
                'media_path': media_path,
                'has_links': has_links
            }

            if db.messages.find_one({'message_id': message.id}):
                print(f"Duplicate message found with ID: {message.id}, skipping.")
            else:
                db.messages.update_one(
                    {'message_id': message.id},
                    {'$set': message_info},
                    upsert=True
                )
                print(f"Inserted/updated message with ID: {message.id}.")

        await client.disconnect()
        print("Disconnected from Telegram client.")

    except ChannelInvalidError:
        print(f"Channel '{channel_name}' not found")
    except Exception as e:
        print(f"An error occurred: {e}")
        await client.disconnect()
        print("Disconnected from Telegram client.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python search_channel.py <channel_name>")
        sys.exit(1)

    channel_name = sys.argv[1]
    asyncio.run(fetch_channel_details(channel_name))
