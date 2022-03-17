const Agent = require("../model/agentSchema");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomerRequest = require("../model/customerRequestSchema");



exports.getAgents = async(req,res,next)=>{
    const response = await Agent.find({});
    res.send(response) 
}

exports.addAgent = async(req,res,next)=>{
   try{
        let agent = await Agent.findOne({emailId:req.body.emailId});
        if(agent){
            return res.status(400).send({error:"This agent already exists! Please check the agent email id"});
        }
        //encyrpting password 
        let salt = await bycrypt.genSalt();
        req.body.password = await bycrypt.hash(req.body.password,salt);

        const newAgent = await new Agent({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            age: req.body.age,
            emailId: req.body.emailId,
            password: req.body.password
        })

        const response = await newAgent.save();
        res.send({message:"Agent successfully registered!"});
} 
catch (err){
        res.send({message:"Error registering agent-",err});
        res.sendStatus(500)
}
}

exports.agentLogin = async(req,res,next)=>{
 try{
        const agent = await Agent.findOne({emailId:req.body.emailId});
    if(!agent){
        return res.status(400).send({error:"Agent does not exist"});
    }
    const isValid= await bycrypt.compare(req.body.password,agent.password);

    if(!isValid){
        return res.status(403).send({error:"Password or The email id is incorrect"});
    }

    const agentToken = jwt.sign({agent_id:agent._id, agentId:agent.emailId},"C@R/M!Ag",{expiresIn:"10d"});
    res.cookie('agentToken',agentToken,{
        expires: new Date(new Date().getTime() + 360 * 1000),
        sameSite: 'none',
        secure:true,
        httpOnly: true
    })

    res.send(agent._id);

}
catch(err){
    console.log("Error Login Agent-", err);
    res.sendStatus(500);
}
}

exports.findAgent = async(req,res,next)=>{
    try{
        const agentId = req.params.id
        console.log(agentId)
        const response =await Agent.findById(agentId);
    res.send(response);
    }
    catch(error){
        console.log("Error finding agent-", error);
        res.sendStatus(500);
    }
}

exports.deleteAgent = async(req,res,next)=>{
    try{
        const response =await Agent.deleteOne({emailId: req.agent.emailId});
        res.send(response);
    }
    catch(error){
        
        console.log("Error finding agent-", err);
        res.sendStatus(500);
    } 
}

exports.requestAlloted = async(req,res,next)=>{

    let id = req.params.id;

    const allRequest = await CustomerRequest.find({agentId:id});

    const response = allRequest;
    res.send(response);
}

exports.updateCustomerStatusByAgent = async(req,res,next) =>{
    let id = req.params.id;
   try{ const response = await CustomerRequest.findByIdAndUpdate(id,{
        status:req.body.reqStatus,
    })
    res.send(response);
} catch(error){
    console.log(error)
}
}

exports.updateCompletedReqByAgent = async(req,res,next) =>{
    let id = req.params.id;
   try{ const response = await Agent.findByIdAndUpdate(id,{
    completedAssignment:req.body.completedAssignment,
    })
    res.send(response);
} catch(error){
    console.log(error)
}
}

exports.addCustomersToAgentArray = async(req,res,next) =>{
    let agentId = req.params.id
    try{
        const response = await Agent.findByIdAndUpdate(agentId,{
            $addToSet:{assignedRequest:req.body.id}
        })        
    }
    catch(err){

    }
}

exports.removeCustomersToAgentArray = async(req,res,next) =>{
    let agentId = req.params.id
    try{

        console.log(req.body.id)
        const response = await Agent.findByIdAndUpdate(agentId,{
            $pull:{assignedRequest:req.body.id}
        })        
        res.send(response)
        // console.log("array element deleted sucessfully");
    }
    catch(err){
        // console.log("error pulling")
    }
}