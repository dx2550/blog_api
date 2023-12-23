// importing authenticate module
const authenticateModel = require('./auth_model')

// importing status codes
const Codes = require("../../../config/status_codes");

// importing headervalidation 
const middleware = require("../../../middleware/headervalidator");

// importing validation required rules
const validationRules = require('../validation_rules');
const validatorRules = require('../validation_rules');


// signup controller
const signup = async(req, res)=>{
    const valid = await middleware.checkValidationRules(req.body, validationRules.sigupValidation)
    if (valid.status) {
        return authenticateModel.signup(req.body, res)
    }else{
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}

const login = async(req, res)=>{
    const valid = await middleware.checkValidationRules(req.body, validationRules.loginValidation)
    if (valid.status) {
        return authenticateModel.login(req.body, res)
    }else{
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null)
    }
}

module.exports = {
    signup,
    login,
}