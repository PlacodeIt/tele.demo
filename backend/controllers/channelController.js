const Channel = require('../models/Channel');

exports.getChannelData = async (req, res) => {
    try {
        const channelData = await Channel.find();
        res.json(channelData);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
