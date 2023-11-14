const mongoose = require("mongoose")

// Define schema
const Schema = mongoose.Schema;

const MSGStoreSchema = new Schema({
    sender: {
        type: String,
        trim: true,
        required: true
    },
    receiver: {
        type: String,
        trim: true,
        required: true
    },
    msg: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

// Compile model from schema
const MSGStore = mongoose.model("MsgStore", MSGStoreSchema);

module.exports = MSGStore