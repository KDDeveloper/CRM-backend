const AdminLogin = require("../model/adminSchema");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.adminRegister = async(req,res,next)=>{
    try{
        let admin = await AdminLogin.findOne({emailId: req.body.emailId});

        if(admin){
            return res.status(400).send({error:"Admin already exists!"});
        }

        const salt = await bycrypt.genSalt();
        req.body.password =await bycrypt.hash(req.body.password, salt);

       const newAdmin = await new AdminLogin({
            adminFirstName: req.body.adminFirstName,
            adminLastName: req.body.adminLastName,
            emailId:req.body.emailId,
            password:req.body.password,
            userType:"admin"
        });
        const savedAdmin = await newAdmin.save()
        // res.json(savedAdmin);
        res.send({message:"Admin successfully registered"})
    } 
    catch(err){
        res.send({message:"Error registering admin-",err});
        res.sendStatus(500);
    }
}


exports.adminLogin = async(req,res,next)=>{
   try {
    let admin = await AdminLogin.findOne({emailId: req.body.emailId});
        console.log(admin)
    if(!admin){
        return res.status(400).send({error:"This admin does not exists! Please sign up."});

    }
    //checking password
    const isValid =await bycrypt.compare(req.body.password, admin.password)
    console.log(isValid)
    if(!isValid){
        return res.status(403).send({error:"The email or password is incorrect"});

    }

    const authToken = jwt.sign({adminId:admin._id, emailId:admin.emailId},"C@R/M!",{expiresIn:"10d"});
    
    res.cookie('jwt',authToken,{
        expires: new Date(new Date().getTime() + 360 * 1000),
        sameSite: 'none',
        secure:true,
        httpOnly: true
     });
    res.send({authToken})
} catch (err){
    console.log("Error Login Admin-", err);
                res.sendStatus(500);
}
}

exports.adminLogout = async(req,res,next) =>{
    try{
        res.cookie("jwt","")
    }
    catch(err){

    }
}

// exports.useType = async(req,res,next)=>{
//     try{
//         let admin = await AdminLogin()
//     }
// }
