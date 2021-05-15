const joi = require(`joi`);
const UserModel = require(`../models/users.model`);
const userModel=new UserModel();

class UserController {
    registerUser(body) {
        return userModel.registerUser(body);
    }

    loginUser (body) {
        return userModel.loginUser(body);
    }
}

module.exports = UserController;