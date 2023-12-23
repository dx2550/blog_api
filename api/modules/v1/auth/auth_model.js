
const common = require("../../../config/common");
const lang = require("../../../config/language");
const Codes = require("../../../config/status_codes");
const userschema = require('../../schema/user')
const middleware = require("../../../middleware/headervalidator");
// const template = require('../../../config/template');

const authenticateModel = {
    // signup api

    async signup(req, res) {
        try {
            // check unique email and username 
            const checkUnique = await common.checkUnique(req);
            if (checkUnique) {
                // if same email then through error
                return await middleware.sendResponse(res, Codes.NOT_FOUND, `email id is already exits`, null)
            } else {
                const createUserData = await userschema.create(req);
                const { expiresIn, token } = await common.tokenGenrate(createUserData);
                middleware.sendResponse(res, Codes.SUCCESS, `Sign up success`, token);
            }
        } catch (error) {
            middleware.sendResponse(res, Codes.INTERNAL_ERROR, `error `, error);
        }
    },


    async login(req, res) {
        try {
            const user = await userschema.findOne({ username: req.username });
            if (!user) {
                return middleware.sendResponse(res, Codes.NOT_FOUND, lang[req.language].rest_keywords_user_not_found);
            } else {
                const { expiresIn, token } = await common.tokenGenrate(user);
                middleware.sendResponse(res, Codes.SUCCESS, `successs`, token);
            }
        } catch (error) {
            console.error(error);
            return middleware.sendResponse(res, Codes.INTERNAL_ERROR, "error",error);
        }

    },


    async CheckUniqueEmail(req) {
        const userDetails = await userschema.findOne({ email: req.email })
        if (userDetails != null) {
            return userDetails;
        }
        return null;
    },

}

module.exports = authenticateModel;