const mongoose = require('mongoose');
const { BlogPostSchema } = require('./BlogPost');
const bcrypt= require('bcrypt');
// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    posts: [BlogPostSchema], // Array of posts (assuming postSchema is defined)
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' // Default role is user
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    // If password is not modified, move to the next middleware
    if (!this.isModified('password')) return next();
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;
