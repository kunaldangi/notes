const nodemailer = require('nodemailer');
const config = require("./config.json")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail_info.email,
        pass: config.gmail_info.password
    }
});

const send_mail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(info);
                }
            });
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {transporter, send_mail};