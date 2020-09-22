const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: [true,"Task name is required"]
    },
    description: {
        type: String,
        required: [true,"Task description is required"]
    },
    priorityLevel: {
        type: Number,
        default: 0
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column"
    },
    dueDate: Date,
    archived: {
        type: Boolean,
        default: false
    }
}, {timestamps : true});

module.exports.Task = mongoose.model('Task', TaskSchema);