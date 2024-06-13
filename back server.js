const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // For sending emails

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Implement your logic here (e.g., send an email or store in a database)
    // Example using nodemailer to send an email:
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maxvendatron@gmail.com',
            pass: 'Kashif12345@'
        }
    });

    const mailOptions = {
        from: email,
        to: 'maxvendatron',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.toString() });
        }
        res.status(200).json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
