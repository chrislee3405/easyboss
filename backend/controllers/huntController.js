const Hunt = require('../models/Hunt');

const getHunts = async (req,res) => {
    try {
        const hunts = await Hunt.find({ userId: req.user.id });
        res.json(hunts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addHunt = async (req,res) => {
    const { bossId, time, channel, fullChannel } = req.body;
    try {
        const hunt = await Hunt.create({ userId: req.user.id, bossId: bossId, time, channel, fullChannel });
        res.status(201).json(hunt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

const updateHunt = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);
    if (!hunt) return res.status(404).json({ message: 'Hunt not found' });

    // Optional: ensure user owns this hunt
    if (hunt.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { time, channel, fullChannel } = req.body;

    // Update fields if provided
    if (time) hunt.time = time;
    if (channel !== undefined) hunt.channel = channel;
    if (fullChannel !== undefined) hunt.fullChannel = fullChannel;

    const updatedHunt = await hunt.save();
    res.json(updatedHunt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllHunts = async (req, res) => {
  try {
    await Hunt.deleteMany({ userId: req.user.id });
    res.json({ message: 'All hunts deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHunts, addHunt, updateHunt, deleteAllHunts };
