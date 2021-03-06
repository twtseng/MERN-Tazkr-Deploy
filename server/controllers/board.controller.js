const { Board } = require('../models/board.model');
const { Column } = require('../models/column.model');

const handleResponse = (err,result,resp) => err ? resp.status(400).json(err) : resp.json(result);

module.exports = {
    createBoard : async (req,resp) => {
        await Board.create(req.body, (err,result) => handleResponse(err,result,resp));
    },
    getAllBoards : async (req,resp) => {
        await Board.find({}, (err,result) => handleResponse(err,result,resp));
    },
    getSingleBoard : async (req,resp) => {
        await Board.findOne({_id:req.params.id}, (err,result) => handleResponse(err,result,resp))
        .populate({ path: 'columns',
        populate: { path: 'tasks'}
    });
    },
    updateBoard : async (req,resp) => {
        await Board.findOneAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true}, (err,result) => handleResponse(err,result,resp));
    },
    deleteBoard : async (req,resp) => {
        await Board.findOneAndDelete({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
    },
    addColumnToBoard : async (req,resp) => {
        try {
            const newColumn = await Column.create(req.body);
            const updatedBoard = await Board.findOneAndUpdate({_id:req.params.id}, {$push: { columns: newColumn }}, {new:true});
            resp.json(updatedBoard);
        } catch (err) {
            resp.status(400).json(err);
        }
    }
}