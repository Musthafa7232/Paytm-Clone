import { createTransport } from 'nodemailer';

const verifyEmail = async (email, otp) => {
  console.log("verify email in function");
  try {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Account verification",
      text: `Your OTP for email verification is: ${otp}`,
      html: `
        <div>
          <p>Your OTP for email verification is: <strong>${otp}</strong></p>
        </div>
      `
    });

    console.log("Mail sent successfully");
  } catch (error) {
    console.log(error );
    throw new Error("Mail failed to send");
  }
};

export default verifyEmail;
