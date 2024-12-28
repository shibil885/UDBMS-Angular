const Users = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const isAdmin = await Users.findOne({ email: email, isAdmin: true })
        if (!isAdmin) return res.status(400).json({ message: "Invalid email" })

        const isValidPassword = await bcrypt.compare(password, isAdmin.password)
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid Password' })
        const payload = { admin: { id: isAdmin._id } }
        jwt.sign(payload, process.env.JWT_SECERET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error
            return res.status(200).json(token)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({ isAdmin: false })
        return res.json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

const removeUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const removedUser = await Users.findOneAndDelete({ email });
        if (removedUser) {
            return res.status(200).json({ message: 'Removed user', email });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const editUser = async (req, res) => {
    try {
        const { _id, name, email, phone } = req.body
        console.log(req.body);
        const editedUser = await Users.findByIdAndUpdate(_id, {
            name: name,
            phone: phone,
            email: email
        })
        if (editUser) {
            const user = await Users.findById(_id)
            return res.status(200).json({ user })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const addUser = async (req, res) => {
    try {
        const { name, email, password, phone, } = req.body
        let user = await Users.findOne({ email: email })
        console.log(req.body);
        if (user) {
            console.log(user);
            return res.status(400).json({ message: 'User alreadyyyy exist' })
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        user = new Users({
            name,
            email,
            password: hashedPassword,
            phone,
        })
        await user.save()
        const currentUser = await Users.findOne({ email: email })
        return res.status(200).json(currentUser)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    adminLogin,
    getAllUsers,
    removeUser,
    editUser,
    addUser
}

