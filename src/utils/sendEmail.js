import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Generic email sender
 * @param {string|string[]} to 
 * @param {string} subject 
 * @param {string} text 
 * @param {string} html 
 */
export const sendEmail = async (to, subject, text, html = null) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            ...(html && { html }),
            attachments: [
                {
                    filename: "logo.png",
                    path: path.join(__dirname, "../../assets/logo.png"), 
                    cid: "trustlogo" 
                }
            ]
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Email error to:", to, error);
        throw error;
    }
};
