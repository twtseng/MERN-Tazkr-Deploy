const {getAllUsers,getSingleUser,createUser,updateUser,deleteUser} = require('../controllers/user.controller');

module.exports = app => {
    app.get('/api/users', getAllUsers);
    app.get('/api/users/:id', getSingleUser);
    app.post('/api/users/create', createUser);
    app.put('/api/users/:id/update', updateUser);
    app.delete('/api/users/:id/delete', deleteUser);
}