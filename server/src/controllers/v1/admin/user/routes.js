const app = require('express')();

const UserController = require('./user');


app.post(
  '/register',
  // AuthHelper.authenticateJWT(usersRoles.getAdmin()),
  UserController.create
);

app.post('/login', UserController.login);




// app.get(
//   '/profile/:id',
//   // AuthHelper.authenticateJWT(usersRoles.getAdmin()),
//   UserController.getUserProfile
// );
// app.put(
//   '/update/:id',
//   // AuthHelper.authenticateJWT(usersRoles.getAdmin()),
//   UserController.update
// );

// app.patch('/status/:id', UserController.changeStatus);
// app.delete('/deleteById/:id', validate('checkParamId'), UserController.delete);
// app.put('/resetPassword/:id', UserController.resetPassword);


module.exports = app;