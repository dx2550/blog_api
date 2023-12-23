
const Codes = require("../../../config/status_codes");
const postchema = require('../../schema/post')
const middleware = require("../../../middleware/headervalidator");
const moment = require('moment')

const authenticateModel = {
   
    
    async getAllPost(req, res) {
        try {
            
            const result = await postchema.find().populate('author',"username -_id")
            
           let allResult = result.map(item=>({
                id:item._id,
                title:item.title,
                content:item.content,
                author: item.author.username,
                created_at:item.created_at,
            }))

            return middleware.sendResponse(res, Codes.SUCCESS, 'post retrived', allResult);
        
        } catch (error) {

            return middleware.sendResponse(res, Codes.VALIDATION_ERROR, 'post retrived error', error);
        }
    },
    async getPost(req, res) {
        try {
            const result = await postchema.findById(req, { create_at :0, updated_at:0 })
            
            return middleware.sendResponse(res, Codes.SUCCESS, 'post retrived', result);
        } catch (error) {
            return middleware.sendResponse(res, Codes.VALIDATION_ERROR, 'post retrived error', error);
        }
    },

    async createPost(req, res) {
        try {
            const result = await postchema.create(req)
            return middleware.sendResponse(res, Codes.SUCCESS, 'post created', result);
        } catch (error) {
            return middleware.sendResponse(res, Codes.VALIDATION_ERROR, 'post create error', error);
        }
    },

    async putPost(req, res) {
        try {
            let postId = req.params.id
            let {title, content ,author }=req.body
            const result = await postchema.findOneAndUpdate({ _id: postId }, { title, content, author, updated_at: moment().utc().format('YYYY-MM-DD HH:mm:ss')  })
            return middleware.sendResponse(res, Codes.SUCCESS, 'post updated', result);
        } catch (error) {
            return middleware.sendResponse(res, Codes.VALIDATION_ERROR, 'post update error', error);
        }
    },

    async deletePost(req, res) {
        try {
            let postId = req.params.id
            const result = await postchema.findByIdAndDelete(postId)
            return middleware.sendResponse(res, Codes.SUCCESS, 'post deleted', true);
        } catch (error) {
            return middleware.sendResponse(res, Codes.VALIDATION_ERROR, 'post delete error', error);
        }
    },


}

module.exports = authenticateModel;