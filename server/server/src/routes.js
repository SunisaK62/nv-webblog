const UserController = require('./controllers/UserController')

module.exports = (app) =>{
    app.post('/user',UserController.create)
    app.put('/user/:userId',UserController.put)
    app.delet('./user/:userId',UserController.remove)
    app.get('/user/:userId',UserController.show)
    app.get('/users',UserController.index)
}