//jshint esversion:6
const nodemailer = require('nodemailer');
const {
    google
} = require('googleapis');
// var smtpTransport = require('nodemailer-smtp-transport');
// const OAuth2 = google.auth.OAuth2;
const CLIENT_ID = '93060993008-1k2r2prfv2v1vs0kn4erbqg8kol6o16k.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04O4cMex5Iv7cCgYIARAAGAQSNwF-L9Ir0yy-fdhWZc3nFAJ6i8_LD7rIwgXEhTDGrz15deJBS4wO1FIW7vRRoGE5-Nk9ID05sBg';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

//   var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            // port: 465,
            // secure: true,
            service:"Gmail",
            auth: {
                type: 'OAuth2',
                user: 'trupteeundre49@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'trupteeundre49@gmail.com',
            to: 'trupteeundre49@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            // html: '<h1>Hello from gmail email using API</h1>',
        };

        transport.sendMail(mailOptions,(err,result)=>{
            if(err) console.log(err);
            else{
                console.log(result);
            }
            console.log("result");
            // transport.close();
        });
        // return result;
    } catch (error) {
        return error;
    }
}

// let mailTransporter = nodemailer.createTransport("SMTP", {
//     host: "smtp.gmail.com", // hostname
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     auth: {
//        
//     },
//     tls: {
//         rejectUnauthorized: false
//     },

// });
// let mailDetails = {
//     from: "trupteeundre492002@gmail.com",
//     to: "trupteeundre49@gmail.com",
//     subject: 'Password reset link!',
//     text: 'anyhting'
// }
// mailTransporter.sendMail(mailDetails, (err, data) => {
//     if (err) console.log(err);
//     else {
//         console.log('email sent!');
//         // req.flash('message', 'Reset password link has been sent to your email!!');
//         // res.redirect('/forgotPass');
//     }
// })
