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
      to: email,
      subject: 'Welcome to PeopleLead AI!',
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
                <h2 style="color: #108de9; font-size: 22px; margin-top: 0;">Hello there,</h2>
                <p style="margin: 0 0 16px;">
                  Thank you for subscribing to <strong>PeopleLead AI</strong>! We're thrilled to have you join our community.
                </p>
                <p style="margin: 0 0 16px;">
                  You’ll now be among the first to receive our latest AI insights, exclusive content, and updates on future offerings.
                </p>
                <p style="margin: 0 0 16px;">
                  At <strong>PeopleLead AI</strong>, we believe in a human-led, AI-fueled future. We're dedicated to helping you navigate the evolving landscape of artificial intelligence with a focus on people-centric solutions.
                </p>
                <p style="margin: 0 0 24px;">
                  Stay tuned for valuable resources and exciting news!
                </p>
                <p style="margin: 0 0 8px;">Best regards,</p>
                <p style="margin: 0;"><strong>The PeopleLead AI Team</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 13px; color: #666;">
                <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} PeopleLead AI. All rights reserved.</p>
                <p style="margin: 0;">
                  Have questions? Contact us at
                  <a href="mailto:contact@peoplelead.ai" style="color: #108de9; text-decoration: none;">contact@peoplelead.ai</a>
                </p>
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
