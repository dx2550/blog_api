const mongoose = require('mongoose');
const moment = require('moment')

const userSchema = mongoose.Schema({

    username: {
        type: String,
        unique:[true, 'Username already exist'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => moment().utc().format('YYYY-MM-DD HH:mm:ss')
    },
    updated_at: {
        type: Date,
        default: () => moment().utc().format('YYYY-MM-DD HH:mm:ss')
    }
});

const userMondel = mongoose.model('user', userSchema);

module.exports = userMondel;