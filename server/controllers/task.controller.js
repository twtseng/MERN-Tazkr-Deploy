const { Task } = require('../models/task.model');

const handleResponse = (err,result,resp) => err ? resp.status(400).json(err) : resp.json(result);

module.exports = {
    createTask : async (req,resp) => {
        await Task.create(req.body, (err,result) => handleResponse(err,result,resp));
    },
    getAllTasks : async (req,resp) => {
        await Task.find({}, (err,result) => handleResponse(err,result,resp));
    },
    getSingleTask : async (req,resp) => {
        await Task.findOne({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    updateTask : async (req,resp) => {
        await Task.findOneAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true}, (err,result) => handleResponse(err,result,resp));
    },
    deleteTask : async (req,resp) => {
        await Task.findOneAndDelete({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    addToTask : async (req,resp) => {
        await Task.findOneAndUpdate({_id:req.params.id}, {$push: req.body}, {new:true}, (err,result) => handleResponse(err,result,resp));
    }
}