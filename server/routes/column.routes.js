const {getAllColumns,getSingleColumn,createColumn,updateColumn,deleteColumn,addTaskToColumn,removeTaskFromColumn,moveTask} = require('../controllers/column.controller');

module.exports = app => {
    app.get('/api/columns', getAllColumns);
    app.get('/api/columns/:id', getSingleColumn);
    app.post('/api/columns/create', createColumn);
    app.put('/api/columns/:id/update', updateColumn);
    app.delete('/api/columns/:id/delete', deleteColumn);
    app.patch('/api/columns/:id/addTaskToColumn', addTaskToColumn);
    app.patch('/api/columns/:id/removeTaskFromColumn/:taskid', removeTaskFromColumn);
    app.patch('/api/columns/moveTask/:taskid/:fromcolumnid/:tocolumnid', moveTask);
}