const Boss = require('../models/Boss');
const getBosses = async (req,res) => {
    try {
        const bosses = await Boss.find({ });
        res.json(bosses);
        } catch (error) {
            res.status(500).json({ message: error.message });
    }
    };


        module.exports = { getBosses};
