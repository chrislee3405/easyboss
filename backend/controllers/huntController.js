const Task = require('../models/Hunt');

const getHunts = async (req,res) => {
    try {
        const hunts = await Task.find({ userId: req.user.id });
        res.json(hunts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addHunt = async (req,res) => {
    const { bossId, time, channel, fullChannel } = req.body;
    try {
        const hunt = await Task.create({ userId: req.user.id, bossId: bossId, time, channel, fullChannel });
        res.status(201).json(hunt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };




    // const deleteTask = async (
    //     req,
    //     res) => {
    //     try {
    //     const task = await Task.findById(req.params.id);
    //     if (!task) return res.status(404).json({ message: 'Task not found' });
    //     await task.remove();
    //     res.json({ message: 'Task deleted' });
    //     } catch (error) {
    //     res.status(500).json({ message: error.message });
    //     }
    //     };
module.exports = { getHunts, addHunt };
