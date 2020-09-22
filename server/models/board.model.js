const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: [true,"Board name is required"],
        minlength: [3,"Board name must be at least 3 characters"],
    },
    columns : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column"
    }],
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updatedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    archived : {
        type: Boolean,
        default: false
    }
}, {timestamps : true});

module.exports.Board = mongoose.model('Board', BoardSchema);

