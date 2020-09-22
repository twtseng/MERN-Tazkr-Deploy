const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
    Name : {
        type: String,
        default: "Column Name"
    },
    tasks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    locked : {
        type: Boolean,
        default: false
    },
    board : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    archived : {
        type: Boolean,
        default: false,
    }
}, {timestamps : true});

module.exports.Column = mongoose.model('Column', ColumnSchema);