const { Column } = require('../models/column.model');

const handleResponse = (err,result,resp) => err ? resp.status(400).json(err) : resp.json(result);

module.exports = {
    createColumn : async (req,resp) => {
        await Column.create(req.body, (err,result) => handleResponse(err,result,resp));
    },
    getAllColumns : async (req,resp) => {
        await Column.find({}, (err,result) => handleResponse(err,result,resp));
    },
    getSingleColumn : async (req,resp) => {
        await Column.findOne({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    updateColumn : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true}, (err,result) => handleResponse(err,result,resp));
    },
    deleteColumn : async (req,resp) => {
        await Column.findOneAndDelete({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    addToColumn : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.params.id}, {$push: req.body}, {new:true}, (err,result) => handleResponse(err,result,resp));
    }
}