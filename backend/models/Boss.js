
const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
    area: { type: String , required: true},
    respawnMin: { type: String , required: true},
    respawnMax: { type: String , required: true},
    level: { type: Number, required: true },
    name: { type: String, required: true },
    item: { type: String },
    meso: { type: String }
});

module.exports = mongoose.model('Boss', bossSchema);
