import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, origin } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET; // TODO: Use a strong secret from environment variables
    const token = jwt.sign({ email }, jwtSecret as string, { expiresIn: '15m' });

    // --- Send Verification Email ---
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const verificationLink = `${baseUrl}/api/verify-token?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email for PeopleLead AI',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 0; margin: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
            <tr>
              <td style="background-color: #040c23; padding: 20px; text-align: center;">
                <img src="${process.env.NEXT_PUBLIC_BASE_URL}/PeopleLead-AI-Logo.png" alt="PeopleLead AI Logo" style="max-width: 160px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 20px;">
                <h2 style="color: #108de9; font-size: 24px; margin-bottom: 16px;">Hi there,</h2>
                <p style="font-size: 16px; margin-bottom: 16px;">
                  Thank you for your interest in <strong>PeopleLead AI</strong>.
                </p>
                <p style="font-size: 16px; margin-bottom: 24px;">
                  To access our exclusive resources, please verify your email address by clicking the button below. This link will be valid for <strong>15 minutes</strong>.
                </p>
                <p style="text-align: center;">
                  <a href="${verificationLink}" style="background-color: #108de9; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; display: inline-block;">Verify My Email</a>
                </p>
                <p style="font-size: 14px; margin-top: 20px; color: #777;">
                  If the button above doesn’t work, you can also copy and paste this link into your browser:<br/>
                  <a href="${verificationLink}" style="color: #108de9;">${verificationLink}</a>
                </p>
                <p style="font-size: 14px; margin-top: 30px;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
                <p style="font-size: 14px; margin-top: 30px;">
                  Best regards,<br/>
                  The PeopleLead AI Team
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                &copy; ${new Date().getFullYear()} PeopleLead AI. All rights reserved.<br/>
                Need help? Contact us at <a href="mailto:contact@peoplelead.ai" style="color: #108de9;">contact@peoplelead.ai</a>
              </td>
            </tr>
          </table>
        </div>
      `,

    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}