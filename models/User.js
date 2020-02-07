const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        defualt: Date.now
    },
    streetAddress: {
        type: String,
        required: true
    },
    apartmentNumber: {
        type: String
    },
    city: {
        type: String, 
        required: true 
    },
    state: {
        type: String, 
        required: true 
    },
    country: {
        type: String, 
        required: true 
    },
    zipCode: {
        type: String, 
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);