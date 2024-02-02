const emailjs = require('emailjs-com');

module.exports = async function (req, res) {
    try {
        const { name, email, subject, message } = req.body;

        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
                name,
                email,
                subject,
                message,
            },
            process.env.EMAILJS_USER_ID
        );

        res.json({ success: true, message: 'Email sent successfully!', response });
    } catch (error) {
        console.error('Email failed to send:', error);
        res.status(500).json({ success: false, message: 'Error sending the email.' });
    }
};
