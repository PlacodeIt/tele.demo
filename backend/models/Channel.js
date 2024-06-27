const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  about: { type: String },
  participants_count: { type: Number },
  admins_count: { type: Number },
  kicked_count: { type: Number },
  banned_count: { type: Number },
  online_count: { type: Number },
  read_inbox_max_id: { type: Number },
  read_outbox_max_id: { type: Number },
  unread_count: { type: Number },
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;