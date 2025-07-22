const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async(req,res)=>{

    const {name,email,message} = req.body;

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.APP_KEY
        }
    })

    const sendMailOptions = transporter.sendMail({
        from:process.env.EMAIL,
        to:process.env.EMAIL,
        subject:`New message from ${name}`,
        text:`You have received a new message from ${name} (${email}):\n\n${message}`
    })

    res.status(200).json({message:"Mail Sent Successfully"});
}


module.exports = sendMail;