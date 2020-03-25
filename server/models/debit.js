const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let date = new Date();

let date_now = date.toDateString();
let time_now = date.toLocaleTimeString();

let Debit = new Schema({
    user_id: {
        type: String,
        required: [true, 'user id is required'],
    },
    amount: {
        type: Int32Array,
        required: [true, 'amount is required']
    },
    description: {
        type: String,
        required: [true, 'description of debit is required']
    },
    comment: {
        type: String,
        required: [false],
        default: "No comment"
    },
    can_edit: {
        type: Boolean,
        required: [false],
        default: false
    },
    time: {
        type: String,
        default: time_now
    },
    time: {
        type: Date,
        default: date_now
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Debit', Debit)