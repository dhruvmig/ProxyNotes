const User=require('../models/user');
const sgMail = require('@sendgrid/mail');
async function forgotPassword(req,res)
{
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user)
        {
            res.status(401).send('User does not exist');
        }
        const randomNo=Math.floor((Math.random()*10000)+1);
        user.resetNo=randomNo;
        let resp=await user.save();
        console.log(user.resetNo);
        // res.status(200).send(user)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
            const msg = {
            to: 'test@example.com',
            from: 'test@example.com',
            subject: 'Please Reset Your Password',
            text: `We heard that you lost your password. Sorry about that But don’t worry! You can use the following Number to reset your password:
                      ${randomNo}  `,
            html: '<strong>and easy to do</strong>',
            };
       

        // (async () => {
        //     try {
        //       await sgMail.send(msg);
        //       res.status(200).send('A mail has been sent to you')
        //     } catch (error) {
        //       console.error(error);
        //         res.status(500).send(error)
        //       if (error.response) {
        //         console.error(error.response.body)
        //       }
        //     }
        //   })();
    }
    catch(e)
    {
        console.log('error in forgot password',e);
        res.status(500).send(e);
    }    
}

async function resetPassword(req,res)
{
    try {
            let response=await User.findOne({email:req.body.email});
            console.log('reset pass',response);
            if(response.resetNo === req.body.resetNo)
            {
                let user=await User.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
                res.status(200).send(user);
            }
            else
            {
                res.status(400).send('error in reset no.')
            }
            

    } catch (error) {
        console.log('Error in reset Password',error);
        res.status(500).send()
    }
}

module.exports={resetPassword,forgotPassword};