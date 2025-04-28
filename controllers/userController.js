const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exists!! please login");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new users({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json(username);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.loginController = async (req,res)=>{
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(isPasswordCorrect  && existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("Invalid Email / Password..")
        }
    }catch(err){
        res.status(401).json(err)
    }
}