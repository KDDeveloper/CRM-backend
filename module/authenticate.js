const jwt = require("jsonwebtoken")

exports.authAdmin = (req,res,next)=>{
    {
          const token = req.cookies.jwt;
          console.log(token)
          if (token){
            try{
              req.admin = jwt.verify(token,'C@R/M!');
              next();
            }
            catch(error){
                console.log("token Invalid",error)
              res.sendStatus(401)
          }
        } else{
            console.log("Token does not exist")
            res.sendStatus(401)
          }
        }
}

exports.authAgent = async(req,res,next)=>{
        const token = req.cookies.agentToken;
        if(token){
          try {
            req.agent = jwt.verify(token,'C@R/M!Ag'); 
            next();
          }
          catch(error){
            console.log("token Invalid",error)
            res.sendStatus(401)
          }
        } else{
          console.log("Token does not exist")
            res.sendStatus(401)
        }
}
