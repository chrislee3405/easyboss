
const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
    bossId: { type: mongoose.Schema.Types.ObjectId, required: true },
    area: { type: String , required: true},
    responseMin: { type: String , required: true},
    responseMax: { type: String , required: true},
    level: { type: Number, required: true },
    name: { type: String, required: true },
    item: { type: String },
    meso: { type: String }
});

module.exports = mongoose.model('Boss', bossSchema);
