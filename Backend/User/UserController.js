const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('./UserModel')
const validator = require("validator");



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Validate email format & password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user object
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to MongoDB
        const savedUser = await newUser.save();

        // Send success response with username
        res.json({ success: true, message: "Account created successfully", username: savedUser.username });
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.json({ success: false, message: "An error occurred. Please try again.", error: error.message });
    }
};

const loginUser = async (req, res) => {
        const { email, password } = req.body;
let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);

        // Return the response
        res.json({
            success: true,
            token,
            username: user.username,
        });
    } ;
    module.exports = { loginUser, registerUser};
