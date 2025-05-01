const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            req.payload = jwtResponse.userId
            next()
        }catch(err){
            res.status(401).json("Invalid token.. Please Login!!")
        }
    }else{
        res.status(404).json("Missing token!!")
    }
}

module.exports = jwtMiddleware