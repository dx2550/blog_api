const mongoose = require('mongoose');
const moment = require('moment')
const userschema= require ('./user')  


const blogSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    author : {
        type: String,
        ref: userschema, //it should be object id but due to time limits i do this 
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

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;

