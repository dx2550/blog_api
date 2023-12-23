const validatorRules =  {


    // auth api rules
    
    sigupValidation: {
        username: "required",
        name: "required",
        email: "required|email",
        password: "required"
    },

    logout_info : {
        "user_id" : "",
        "is_active":"required"
    },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // blog api rules

    post: {
        title: "required",
        content : "required",
        author : "",
        createdAt:""
    },

}
module.exports = validatorRules;
