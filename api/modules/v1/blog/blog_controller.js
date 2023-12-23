const authenticateModel = require('./blog_model')
const Codes = require("../../../config/status_codes");
const middleware = require("../../../middleware/headervalidator");
const validationRules = require('../validation_rules');
const { error } = require('winston');

const getAllPost = async (req, res) => {
    
    if (req) {
        return authenticateModel.getAllPost(req, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}

const getPost = async (req, res) => {

    let postId = req.params.id
    if (postId) {
        return authenticateModel.getPost(postId, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}

const createPost = async (req, res) => {

    const valid = await middleware.checkValidationRules(req.body, validationRules.post)
    if (valid.status) {
        let newPost = {
            title: req.body.title,
            content: req.body.content,
            author:req.user_id,
        }
        return authenticateModel.createPost(newPost, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}

const putPost = async (req, res) => {
    const valid = await middleware.checkValidationRules(req.body, validationRules.post)
    if (valid.status) {
        return authenticateModel.putPost(req, res)
    } else {
        
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, error);
    }
}

const deletePost = async (req, res) => {
    if (req) {
        
        return authenticateModel.deletePost(req, res)
    
    } else {
        
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    
    }
}
module.exports = {
    getAllPost,
    getPost,
    createPost,
    putPost,
    deletePost,
}