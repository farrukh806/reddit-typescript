"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to, html) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'a4kl7u334g46ffjk@ethereal.email',
            pass: 'NGsZPUmHeqhgJyvqCV' // generated ethereal password
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to,
        subject: 'Change password',
        html
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map