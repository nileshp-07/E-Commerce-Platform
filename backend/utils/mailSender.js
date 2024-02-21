const nodemailer = require("nodemailer");


const mailSender = async (email , title , body) => {
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            },
            secure : false,
        })


        let info = await transporter.sendMail({
            from : "FlashGo - Nilesh Patidar",
            to : email,
            subject :  title,
            html : body
        })

        console.log("mail info : ", info);
        return info;
    }
    catch(error)
    {
        console.error(error);
        return error.message;
    }
}


module.export = mailSender;
