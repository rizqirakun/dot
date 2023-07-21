const User = require("../models/userModel");
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Register = async (req, res, next) => {
    const { email, password, name, createdAt } = req.body;


    try {
        const isUserDuplicate = await User.findOne({ email });
        if (isUserDuplicate) {
            throw { status: 403, message: 'User already exist' };
        }

        const user = await User.create({ email, password, name, createdAt });

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (err) {
        console.error(err);
        let status = 500;
        if (!email | !password | !name) {
            status = 400;
        } else if (err.status) {
            status = err.status;
        }
        res.status(status);
        res.json({ message: err.message })
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Email and password field required' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (err) {
        console.error(err);
        const status = err.status || 400;
        res.status(status);
        res.json({ message: err.message });
    }
}