"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
// async..await is not allowed in global scope, must use a wrapper
function mailService(mailOptions, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            //let account = await nodemailer.createTestAccount();
            //console.log(account);
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: "gmail",
                secure: false,
                auth: {
                    user: 'no.reply.onestopyoga',
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
            const ejsFilePath = path.join(__dirname, '../', 'views', 'general-mail.ejs');
            const compiled = ejs.compile(fs.readFileSync(ejsFilePath, 'utf8'));
            // send mail with defined transport object
            mailOptions.html = compiled(mailOptions);
            let info = yield transporter.sendMail(mailOptions);
            if (callback) {
                callback(info);
            }
            // console.log("Message sent: %s", info.messageId);
            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.mailService = mailService;
