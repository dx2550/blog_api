const nodemailer = require('nodemailer');
const twilio = require('twilio')
const dbConn = require("./database");
const userSchema = require("../modules/schema/user");
const jwt = require('jsonwebtoken')
const common = {

    // function for check unique email or username
    async checkUnique(req) {
        try {
            console.log(req);
            const user = await userSchema.findOne({ $or:[
                {email: req.email},
                {username: req.username}
            ] })
            if (user != null) {
                return true;
            }
            return false;
        } catch (error) {
            return error;
        }
    },
    
    async tokenGenrate(data){
    try {
        let  {_id, email, username} = data
        const secretKey = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jwt.sign({_id, email, username}, secretKey, { expiresIn }) };
    } catch (error) {
        
    }
    },


    /**
  * @comment Function to generate random otp.
  * 12-08-2022
  */
    async RandomOtpGenerator() {
        const seq = (Math.floor(Math.random() * 10000) + 10000)
            .toString()
            .substring(1);
        return seq;

    }



}




module.exports = common;