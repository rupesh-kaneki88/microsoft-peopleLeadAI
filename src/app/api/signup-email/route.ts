import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.CLIENT_EMAIL,
      subject: 'New user interested in PeopleLead AI',
      html: `
        <div style="background-color: #f9f9f9; padding: 0; margin: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; font-family: Arial, sans-serif; color: #333; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
            <!-- Logo Header -->
            <tr>
              <td style="background-color: #040c23; padding: 24px; text-align: center;">
                <img src="${process.env.NEXT_PUBLIC_BASE_URL}/PeopleLead-AI-Logo.png" alt="PeopleLead AI Logo" style="max-width: 160px;" />
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 32px 24px; font-size: 16px; line-height: 1.6;">
                <h2 style="color: #108de9; font-size: 22px; margin-top: 0;">New User Inquiry</h2>
                <p>A new user has expressed interest in PeopleLead AI.</p>
                <p><strong>User's Email:</strong> ${email}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 13px; color: #666;">
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} PeopleLead AI. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
