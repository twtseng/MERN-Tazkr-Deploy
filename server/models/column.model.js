const mongoose = require('mongoose');
const Board = require('./board.model');
const Task = require('./task.model');
const User = require('./user.model');

const ColumnSchema = new mongoose.Schema({
    Name : {
        type: String,
        default: "Column Name"
    },
    tasks : {
        type: [{
            type:Task
        }],
    },
    locked : {
        type: Boolean,
        default: false
    },
    board : {
        type:Board
    },
    updatedBy: {
        type: User
    },
    archived : {
        type: Boolean,
        default: false,
    }
}, {timestamps : true});

module.exports.Column = mongoose.model('Column', ColumnSchema);