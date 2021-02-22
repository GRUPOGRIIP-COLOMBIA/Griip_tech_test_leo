require('dotenv/config');

const UserModel = require('../models/user');

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const UserController = {
    all: async (req, res) => {
        const allUsers = await UserModel.find();

        res.json(allUsers);
    },

    find: async (req, res) => {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            res.json(user);
            
            return;
        };

        res.status(404);
    },

    create: async (req, res) => {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                errorMessage: 'Este email ya pertenece a una cuenta',
            });

            return;
        };

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        let newUser = new UserModel({
            name,
            email,
            passwordHash,
        });

        let savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id,
        }, process.env.JWT_SECRET);

        res
            .cookie('token', token, {
                httpOnly: true,
                expires: new Date(253402300000000),
            })
            .send(savedUser._id);
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const loginUser = await UserModel.findOne({ email });

        if (!loginUser) {
            res.status(401).json({
                errorMessage: 'Email o contraseña incorrectos.'
            });

            return;
        };

        const correctPassword = await bcrypt.compare(password, loginUser.passwordHash);

        if (!correctPassword) {
            res.status(401).json({
                errorMessage: 'Email o contraseña incorrectos.'
            });

            return;
        };

        const token = jwt.sign({
            user: loginUser._id,
        }, process.env.JWT_SECRET);

        res
            .cookie('token', token, {
                httpOnly: true,
                expires: new Date(253402300000000),
            })
            .send(loginUser._id);
    },

    logout: (req, res) => {
        res
            .cookie('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            .send();
    },

    updatePassword: (req, res) => {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                console.log(err);

                return;
            };

            const token = buffer.toString('hex');

            const user = await UserModel.findById(req.params.id);

            if (!user) {
                res.status(422).json({
                    errorMessage: 'User not found'
                });

                return;
            };

            const correctPassword = await bcrypt.compare(req.body.password, user.passwordHash);

            if (!correctPassword) {
                res.status(401).json({
                    errorMessage: 'Wrong password.'
                });
    
                return;
            };

            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;

            await user.save();

            res.json({ token: token })
        });
    },

    newPassword: async (req, res) => {
        const newPassword = req.body.password;
        const sentToken = req.body.token;

        const user = await UserModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } });

        if (!user) {
            res.status(422).json({
                errorMessage: 'This link has expired, please request a new link.'
            });

            return;
        };

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);

        user.passwordHash = passwordHash;
        user.resetToken = undefined;
        user.expireToken = undefined;

        await user.save();

        res.send('Password updated successfully');
    },
};

module.exports = UserController;