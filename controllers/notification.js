// const nodemailer = require('nodemailer');

// // Email sending function
// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: false, // True for 465, false for other ports
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: '"eClinic" <no-reply@eclinic.com>', // Sender address
//       to, // Recipient email
//       subject, // Subject line
//       text, // Plain text body
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//   }
// };

// module.exports = sendEmail;
