// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { email, dataUrl } = req.body;

  // Configure your nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // For TLS, set this to false
    auth: {
      user: 'kumar932687@gmail.com',
      pass: 'cxeytzprsmkijnsh'
    },
  });

  // Send the email with the PDF attachment
  await transporter.sendMail({
    from: 'kumar932687@gmail.com',
    to: email,
    subject: 'PDF attachment',
    text: 'Attached is the PDF document you requested.',
    attachments: [
      {
        filename: 'mypdf.pdf',
        path: dataUrl,
        contentType: 'application/pdf',
      },
    ],
  });

  res.status(200).end();
}
