import { sender_email, AWSSES as transporter } from "../config/awsses.js";

const EmailTemplate = async (receiver_email, subject, body) => {
    const mailOptions = {
        from: sender_email,
        to: receiver_email,
        subject: `R.C- ${subject}`,
        html: `
            <html>                           
                <head></head>
                <body style='background-color:gray; color: black; padding:10px; border-radius:4px;'>
                
                    <h1 style='color:red'> Royal Crest Estate </h1>
                    <p> Trusted Real Estate Platform. Find Your Perfect Home & Investment </p>
                        ${body}
                    <p>Regards:<br>
                        Sunil Tariq
                    </p>
                
                </body>
            </html>
        `,
    };

    try {
        // Nodemailer ke zariye email send karein
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return { success: true, info };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};

export default EmailTemplate;