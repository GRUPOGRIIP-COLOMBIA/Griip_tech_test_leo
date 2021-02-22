const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReminderSchema = new Schema({
    title: String,
    body: String,
    expires: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Reminder', ReminderSchema);