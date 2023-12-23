const Validator = require('Validator');
const lang = require("../config/language");
const logger = require('../logger');
const Codes = require('../config/status_codes');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')
const userschema = require('../modules/schema/user')


const headerValidator = {

    // function for extract accept language from request header and set in req globaly
    extractHeaderLanguage: async (req, res, next) => {
        try {
            const language = (req.headers['accept-language'] !== undefined && req.headers['accept-language'] !== '') ? (req.headers['accept-language'] === 'en-GB,en-US;q=0.9,en;q=0.8' ? 'en' : req.headers['accept-language']) : 'en';
            req.language = language;
            next()
        } catch (error) {
            logger.error(error)
        }

    },

    extractHeaderLanguage: (req, res, next) => {
        try {
            const language = (req.headers['accept-language'] !== undefined && req.headers['accept-language'] !== '') ? req.headers['accept-language'] : "en";
            req.language = language;
            next()
        } catch (error) {
            logger.error(error)

        }
    },

    validateHeaderToken: async (req, res, next) => {
        const bypassMethod = new Array( "signup",  "login", "forget_password", "resetpassword", "resetPass" );
        const pathData = req.path.split("/");
        try {

            if (bypassMethod.indexOf(pathData[1]) === -1) {
                const headertoken = (req.headers.authorization).split(' ')[1]
                if (headertoken !== '') {
                    try {
                        const verificationResponse = (await jwt.verify(headertoken, JWT_SECRET));
                        const userId = verificationResponse._id;
                        const findUser = await userschema.findById(userId);

                        if (findUser) {
                            req.user_id = findUser._id;
                            next();
                        } else {
                    console.log(3);
                            return headerValidator.sendResponse(res, Codes.UNAUTHORIZED, lang[req.language].rest_keywords_token_notvalid_message, null);
                        }
                    } catch (error) {
                    console.log(error);
                        return headerValidator.sendResponse(res, Codes.UNAUTHORIZED, lang[req.language].rest_keywords_token_notvalid_message, null);
                    }
                } else {
                    console.log(1);
                    return headerValidator.sendResponse(res, Codes.UNAUTHORIZED, lang[req.language].rest_keywords_token_notvalid_message, null);
                }
            } else {
                next()
            }
        } catch (error) {
            return headerValidator.sendResponse(res, Codes.INTERNAL_ERROR, 'An error occurred', null);

        }
    },

    // check Validation Rules
    checkValidationRules: async (request, rules) => {
        try {
            const v = Validator.make(request, rules);
            const validator = {
                status: true,
            }
            if (v.fails()) {
                const ValidatorErrors = v.getErrors();
                validator.status = false
                for (const key in ValidatorErrors) {
                    validator.error = ValidatorErrors[key][0];
                    break;
                }
            }
            return validator;
        } catch (error) {
            logger.error(error)
        }
    },


    // function for send Response
    sendResponse: async (res, resCode, msgKey, resData) => {
        try {
            const responsejson =
            {
                "code": resCode,
                "message": msgKey

            }
            if (resData != null) {
                responsejson.data = resData;
            }
            // const result = await headerValidator.encryption(responsejson);
            res.status(resCode).send(responsejson);

        } catch (error) {
            logger.error(error);
        }
    },
}

module.exports = headerValidator;