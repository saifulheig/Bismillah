import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required" });
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use "hotmail", "yahoo", "outlook" or SMTP settings
      auth: {
        user: process.env.EMAIL_USER, // Email username
        pass: process.env.EMAIL_PASS, // Email password or app password
      },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "saiful.islam@solar-ict.com",
        subject: subject || "New Contact Form Message",
        html: `<h3>Name: ${name}</h3><p>Email: ${email}</p><p>Message: ${message}</p>`,
      };
 

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
