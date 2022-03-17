// const { response } = require("express");
const CustomerRequest = require("../model/customerRequestSchema");

exports.insertCustomer= async(req,res,next)=>{
    const newCustomer = new CustomerRequest({
        customerFirstName: req.body.customerFirstName,
        customerLastName: req.body.customerLastName,
        mobileNumber: req.body.mobileNumber,
        emailId: req.body.emailId,
        status: "new lead",
        assignedTo:"",
        agentId:""
    })
    const response = await newCustomer.save();
    res.send(response);
}

exports.getCustomers = async(req,res,next)=>{
    
   try{ const response = await CustomerRequest.find({});
    res.send(response);
    }
    catch(error){
        res.sendStatus(401)
    }
}


exports.updateCustomerStatusByAdmin = async(req,res,next) =>{
    let id = req.params.id;
   try{ const response = await CustomerRequest.findByIdAndUpdate(id,{
        assignedTo:req.body.assignedTo,
        status:"assigned",
        agentId: req.body.agentId
    })
    res.send(response);
} catch(error){
    console.log(error)
}
}

exports.uassignRequestByAdmin = async(req,res,next) =>{
    let id = req.params.id;
   try{ const response = await CustomerRequest.findByIdAndUpdate(id,{
        assignedTo:"",
        status:"new lead",
        agentId: ""
    })
    res.send(response);
} catch(error){
    console.log(error)
}
}

exports.getOneCustomerByAdmin = async(req,res,next) =>{
    try{
    let id = req.params.id;
    const response = await CustomerRequest.findById(id)
    res.send(response);
    }
    catch(error){
        res.sendStatus(500)
    }
}

exports.deleteCustomerRequest = async(req,res,next) =>{
    let id = req.params.id;
    const response = await CustomerRequest.findByIdAndDelete(id)
    res.send(response);
}

