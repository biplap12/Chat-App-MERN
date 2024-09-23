const mongoose = require('mongoose');

// Define the User schema with comprehensive details
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure email is stored in lowercase
        trim: true, // Remove whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
   
    profilePicture: {
        type: String, 
        default: 'default-Profile-Picture.png', 
    },
    phone: {
        type: String,
        trim: true,
        unique: true, 
    },
    address: {
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
       
    },
    dateOfBirth: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
