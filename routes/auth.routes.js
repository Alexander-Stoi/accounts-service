const router = require('express').Router();
const joi = require(`joi`);
const UserController = require(`../controllers/users.controller`);
const userController = new UserController();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(`/register`, async (req, res) => {
    const body = req.body;
    const schema = joi.object(
        {
            email: joi.string().min(10).required(),
            password: joi.string().min(5).required(),
            fullName: joi.string().min(10).required(),
            gender: joi.string().valid('F', 'M').required(),
            role: joi.string().valid('admin', 'user').required()
        });

    const validation = schema.validate(body);

    if (validation?.error) {
        return res.status(400).send({
            message: validation.error.details[0].message,
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    body.password = hashedPassword;

    userController.registerUser(body).then((response) => {
        res.status(200).json(response);
    })

})

router.post(`/login`, async (req, res) => {

    const body = req.body;
    const schema = joi.object({
        email: joi.string().min(10).required(),
        password: joi.string().min(5).required()
    })
    const validation = schema.validate(body);

    if (validation?.error) {
        return res.status(400).send({ message: `Incorrect credentials` });
    }

    userController.loginUser(body).then((response) => {

        const token = 'Bearer ' + jwt.sign({
            "email": body.email,
            "role": response.role
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.header("Authorization", token).send(response);

    })
})

module.exports = router;