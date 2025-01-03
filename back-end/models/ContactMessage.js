const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    adminReplies: [{
        reply: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
    isReplied: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
module.exports = ContactMessage;
