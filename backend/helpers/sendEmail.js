import { sender_email } from "../config/awsses.js";

const EmailTemplate = (receiver_email, subject, body) => {
    const mail = {
        Source: sender_email,
        Destination: {
            ToAddresses: [receiver_email],
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: ` R.C- ${subject}  `,
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        
                        <html>                          <head></head>
                          <body style='background-color:gray; color: black; padding:10px; border-radius:4px;'>
                          
                            <h1 style='color:red'> Royal Crest Estate </h1>
                            <p> Trusted Real Estate Platform. Find Your Perfect Home & Investment </p>
                               ${body}
                            <p>Regards:
                                 Sunil Tariq
                            </p>
                          
                          </body>
                        </html> `,
                },
            },
        },                                                                                                                                                       
    };

    return mail;
};


export default EmailTemplate
                             