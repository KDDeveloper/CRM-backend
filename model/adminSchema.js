const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminLoginSchema = new Schema({
    
    adminFirstName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true,
    },

    adminLastName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
        },

    emailId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
    }
})

const AdminLogin = mongoose.model('adminLogin',AdminLoginSchema,'adminLogin');

module.exports = AdminLogin;
