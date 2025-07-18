
const mongoose = require('mongoose');

const huntSchema = new mongoose.Schema({
    huntId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bossId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boss' },
    time: { type: Date , required: true},

});

module.exports = mongoose.model('Hunt', huntSchema);
