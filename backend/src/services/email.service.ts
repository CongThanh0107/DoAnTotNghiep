import * as nodemailer from 'nodemailer';
import {email} from '../config/vars';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: email.service,
            auth: {
                user: email.sender,
                pass: email.password
            }
        });
    }

    public sendEmail(to: string, subject: string, html: string): Promise<string> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: email.sender,
            to,
            subject,
            html,
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.messageId);
                }
            });
        });
    }
}

export default EmailService;
