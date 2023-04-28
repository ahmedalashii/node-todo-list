const { request } = require('express');
const UserService = require("../services/UserService");

const userController = class UserController {

    static async register(request, response, next) {
        try {
            const body = request.body;
            if (!body.first_name || !body.last_name || !body.email || !body.password) {
                response.status(400).json({ message: "Please fill in all the required fields (first_name, last_name, password, email)." });
            }
            const createdUser = await UserService.register(body);
            if (!createdUser) {
                response.status(404).json({ message: "Couldn't Create New User" });
            }
            if (createdUser.error) {
                response.status(400).json({ message: createdUser.error });
            }
            response.status(200).json(createdUser);
        } catch (error) {
            response.status(500).json({ error: error });
        }
    }

    static async login(request, response, next) {
        try {
            const body = request.body;
            if (!body.email || !body.password) {
                response.status(400).json({ message: "Please fill in all the required fields (email, password)." });
            }
            const user = await UserService.login(body);
            if (!user) {
                response.status(404).json({ message: "Couldn't Login" });
            }
            if (user.error) {
                response.status(400).json({ message: user.error });
            }
            response.status(200).json(user);
        } catch (error) {
            response.status(500).json({ error: error });
        }
    }

    //! Note: We can use redis to store the token and check if it's valid or not :)
}
module.exports = userController;