
const mongoose = require('mongoose');

const huntSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bossId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boss' },
    time: { type: Date , required: true},
    channel: { type: Number , required: true},
    fullChannel: { type: Boolean , required: true},

});

module.exports = mongoose.model('Hunt', huntSchema);
