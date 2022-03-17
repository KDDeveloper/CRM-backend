const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const agentSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    emailId:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    assignedRequest:{
        type:[String]
    },
    completedAssignment:{
       type:Number
    }
})

const AgentSchema = mongoose.model('agents',agentSchema,'agents');

module.exports = AgentSchema;