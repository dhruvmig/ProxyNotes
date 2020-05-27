const User=require('../models/user');
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs');
const helper = require('../helper/common');
// async function addUser(req,res)
// {
//     try{
//         let user=await User.findOne({email:req.body.email});
//         if(user)
//         {
//             res.status(401).send('User already exists');
//         }
//         else
//         {
//             let user=new User(req.body);
//             let result= await user.save();
//             res.status(200).send("User registered Successfully");
//         }   
//     }
//     catch(e)
//     {
//         console.log('error in adding user',e);
//         res.status(500).send(e);
//     }
// }

// async function authUser(req,res)
// {
//     try{
//         let user=await User.findOne({email:req.body.email});
//         if(!user)
//         {
//             res.status(401).send('User does not exist');
//         }
//         if(user.password == req.body.password)
//         {
//             console.log(user);
//             res.status(200).send(user);
//         }
//         else{
//             res.status(400).send('Invalid Usrname Passwod');
//         }
//     }
//     catch(e)
//     {
//         console.log('error occured in authUser',e);
//         res.status(500).send(e);
//     }
// }
// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY
//     }
//   }))


// signup
async function addUser(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // if email exists
            res.status(401).send('user already exists');
        } else {
            // 1. hashing password
            console.log(req.body.password,'heree');
            req.body.password = helper.generateHash(req.body.password)
            
            // 2. saving document
            let user = new User(req.body);
            let result = await user.save();

            // 3. creating token
            let payload = { subject: result._id }
            let token = helper.generateToken(payload);

            // 4. sending token back
            res.send({ token });
        }
    } catch (error) {
        console.log("Error occurrend in addUser ", error);
        res.status(500).send("something went wrong, please try again!!");
    }
}

//login
async function authUser(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send("invalid email or password");
        } else {
            let result = await helper.verifyHash(req.body.password, user.password);
            if (result) {
                // if passwords match
                let payload = { subject: user._id }
                let token = helper.generateToken(payload);
                // sending back response
                console.log("logged in successfully")
                res.status(200).send({ token })
            } else {
                // if passwords doesn't match
                
                res.status(402).send('invalid email or password')
                
            }
        }
    } catch (error) {
        res.status(500).send("something went wrong, try again!!");
    }
}


module.exports={addUser,authUser};