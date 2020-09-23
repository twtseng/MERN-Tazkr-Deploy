const { Column } = require('../models/column.model');
const { Task } = require('../models/task.model');

const handleResponse = (err,result,resp) => err ? resp.status(400).json(err) : resp.json(result);

module.exports = {
    createColumn : async (req,resp) => {
        await Column.create(req.body, (err,result) => handleResponse(err,result,resp));
    },
    getAllColumns : async (req,resp) => {
        await Column.find({}, (err,result) => handleResponse(err,result,resp));
    },
    getSingleColumn : async (req,resp) => {
        await Column.findOne({_id:req.params.id}, (err,result) => handleResponse(err,result,resp))
        .populate('tasks');
    },
    updateColumn : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true}, (err,result) => handleResponse(err,result,resp));
    },
    deleteColumn : async (req,resp) => {
        await Column.findOneAndDelete({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    addTaskToColumn : async (req,resp) => {
        try {
            console.log(`addTaskToColumn id:[${req.params.id}]`);
            const newTask = await Task.create(req.body);
            console.log(`addTaskToColumn new task:[${newTask}]`)
            const updatedColumn = await Column.findOneAndUpdate({_id:req.params.id}, {$push: { tasks: newTask }}, {new:true});
            console.log(`addTaskToColumn updatedColumn:[${updatedColumn}]`)
            resp.json(updatedColumn);
        } catch (err) {
            resp.status(400).json(err);
        }
    },
    removeTaskFromColumn : async (req,resp) => {
        try {
            let originalColumn = await Column.findOne({_id:req.params.id});
            originalColumn.tasks = originalColumn.tasks.filter(taskid => taskid != req.params.taskid);
            const updatedColumn = await Column.findOneAndUpdate({_id:req.params.id}, originalColumn, {new:true});
            resp.json(updatedColumn);
        } catch (err) {
            resp.status(400).json(err);
        }
    },
    moveTask : async (req,resp) => {
        try {
            let originalColumn = await Column.findOne({_id:req.params.fromcolumnid});
            originalColumn.tasks = originalColumn.tasks.filter(taskid => taskid != req.params.taskid);
            await Column.findOneAndUpdate({_id:req.params.fromcolumnid}, originalColumn, {new:true});
            const newColumn = await Column.findOneAndUpdate({_id:req.params.tocolumnid}, {$push: { tasks: req.params.taskid }}, {new:true});
            resp.json(newColumn);
        } catch (err) {
            resp.status(400).json(err);
        }
    }
}