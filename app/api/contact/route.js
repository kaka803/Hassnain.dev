import nodemailer from "nodemailer";

export async function POST(req) {
  const { text, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // Sender Gmail
      pass: process.env.EMAIL_PASS,   // App Password
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO, // Receiver Gmail (same as user if you want)
    subject: "New Message from Portfolio Contact Form",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.6;">
  <h2 style="color: #6C63FF;">📩 New Contact Message</h2>

  <p><strong>👤 Name:</strong> ${text}</p>
  <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #6C63FF;">${email}</a></p>
  
  <p><strong>📝 Message:</strong></p>
  <div style="padding: 10px; background-color: #f4f4f4; border-left: 4px solid #6C63FF; margin-top: 5px;">
    ${message}
  </div>
</div>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
