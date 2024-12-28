

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Users = require("../model/userModel")
require('dotenv').config()

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dnnqz2zqn',
  api_key: '489771453262922',
  api_secret: process.env.YOUR_API_SECRET,
  secure: true,
});


const userSignup = async (req, res) => {
    try {
      const { name, email, password, phone } = req.body.signupData;
  
      console.log('Signup request data:', { name, email, password, phone });
  
      let user = await Users.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new Users({
        name,
        email,
        password: hashedPassword,
        phone,
      });
  
      await user.save();
  
      const payload = { user: { id: user._id } };
      jwt.sign(payload, process.env.JWT_SECERET, { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        return res.json({ token });
      });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

 const imagedisplay = async (req, res) => {
    try {
        const userId = req.params.userId
        console.log(userId + '+++++===');

        const userData = await getAllUsers.findOne({ _id: userId })

        if (userData) {
            const imgFileName = userData.profileImg;
            res.json({ url: imgFileName });
        } else {
            res.status(500).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

 const profileUpload = async (req, res) => {
    try {
        const userId = req.query.userId
        console.log(process.env.YOUR_API_SECRET,'()()()()()()()()()()');

        if (req.file) {
            const filePath = req.file?.path;

            const uploadOptions = {
                transformation: {
                    width: 300,  
                    height: 300, 
                    crop: 'fill' 
                }
            };


            console.log(filePath);
            const uploadedImage = await cloudinary.uploader.upload(filePath, uploadOptions);

            const userData = await Users.findById(userId)
            if (userData) {
                console.log('5678u9i0o');
                
                userData.profileImg = uploadedImage.secure_url;
                await userData.save();
                res.json({ imagePath: uploadedImage.secure_url });
            } else {
                res.status(500).json({ message: "User Not found Or Internal Server Error" });
            }
        } else {
            res.status(500).json({ message: "Image Not found Try again" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login  = async (req,res)=>{
    try {
     const {email,password} = req.body
     const user = await Users.findOne({email:email,isAdmin:false})

     if(!user) return res.status(400).json({message:'Invalid email or password'})

     const isValidPassword = await bcrypt.compare(password,user.password)
     if(!isValidPassword) return res.status(400).json({message:'Invalid email or password'})
     
     const payload = {user:{id:user._id}}
     jwt.sign(payload,process.env.JWT_SECERET,{expiresIn:3600},(error,token)=>{
        if (error) throw error
        console.log(token);
        return res.json({token})
     })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}
module.exports = {
    userSignup,
    login,
}