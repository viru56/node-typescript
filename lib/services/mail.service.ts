"use strict";
import * as nodemailer  from "nodemailer";
import * as ejs from 'ejs';
import * as path from 'path';
import * as fs from 'fs';
// async..await is not allowed in global scope, must use a wrapper
export async function mailService(mailOptions, callback? ) {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let account = await nodemailer.createTestAccount();
        //console.log(account);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'no.reply.onestopyoga', // generated ethereal user
                pass: 'aA@121234' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        // let mailOptions = {
        //     from: '"Onestopyoga" <no.reply.onestopyog@gmail.com', // sender address
        //     to: data.to, // list of receivers
        //     subject: data.subject || 'no reply', // Subject line
        //     text: data.text, // plain text body
        //     html: data.html// html body
        // };
        mailOptions.from = '"onestopyoga" <no.reply.onestopyog@gmail.com'; // sender address
        
        const ejsFilePath = path.join(__dirname,'../','views','general-mail.ejs');
       const compiled = ejs.compile(fs.readFileSync(ejsFilePath, 'utf8'));
        // send mail with defined transport object
        mailOptions.html = compiled(mailOptions);
        let info = await transporter.sendMail(mailOptions);
        if (callback){
            callback(info);
        }
        // console.log("Message sent: %s", info.messageId);
        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }

}