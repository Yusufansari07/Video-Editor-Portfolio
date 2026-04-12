const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

const sendInquiry = async (req, res) => {
    try {
        const { name, email, projectType, budget, message, _honeypot } = req.body;

        if (_honeypot) return res.status(200).json({ success: true, message: 'Message received.' });

        const newInquiry = new Inquiry({ name, email, projectType, budget, message });
        await newInquiry.save();

        try {
            if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'PASTE_16_DIGIT_ZMAIL_APP_PASSWORD_HERE') {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: `New Portfolio Inquiry: ${projectType} from ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget: ${budget || 'N/A'}\nMessage:\n${message}`
                });
            } else {
                console.warn("\n[Warning] Inquiry saved to DB, but EMAIL NOT SENT. Missing Google App Password in .env\n");
            }
        } catch (emailErr) {
            console.error("\n[Error] Email failed to send, but data was saved.", emailErr.message);
        }

        res.status(201).json({ success: true, message: 'Inquiry sent.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
module.exports = { sendInquiry };
