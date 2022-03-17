const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerRequestSchema = new Schema({
    customerFirstName:{
        type:String,
        minlength:3,
        maxlength:20,
        required: true
    },
    customerLastName:{
        type:String,
        minlength:3,
        maxlength:20,
        required: true
    },
    mobileNumber:{
        type:Number,
        minlength:10,
        maxlength:10,
        // required: true
    },
    emailId:{
        type:String,
    },

    status:{
        type:String,
        enum:["new lead","assigned", "in-process","successful","unsuccessful"]
    },

    assignedTo:{
        type:String
    },

    agentId:{
        type:String
    }

})

const CustomerRequest = mongoose.model("customerRequest",customerRequestSchema,"customerRequest");

module.exports = CustomerRequest;