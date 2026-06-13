import { NextRequest, NextResponse } from "next/server";
import { getBiodata } from "@/lib/getData";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get biodata to get the recipient email
    const bio = await getBiodata();
    const recipientEmail = bio.email;

    // Check if RESEND_API_KEY is available
    if (process.env.RESEND_API_KEY) {
      // Using Resend API
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: recipientEmail,
          subject: `[Portfolio] Pesan dari ${name} (${email})`,
          reply_to: email,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6366f1, #ec4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                .sender-info { background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #6366f1; }
                .message-box { background: white; padding: 15px; border-radius: 8px; }
                .label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 4px; }
                .value { font-size: 16px; color: #111827; font-weight: 500; }
                .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af; }
                a { color: #6366f1; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">📬 Pesan Baru dari Portfolio</h2>
                </div>
                <div class="content">
                  <div class="sender-info">
                    <div style="margin-bottom: 10px;">
                      <div class="label">Dari</div>
                      <div class="value">${name}</div>
                    </div>
                    <div>
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                  </div>

                  <div class="message-box">
                    <div class="label">Pesan</div>
                    <div style="margin-top: 8px; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</div>
                  </div>

                  <div class="footer">
                    <p>💡 Klik reply untuk langsung membalas ke <strong>${email}</strong></p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
PESAN BARU DARI PORTFOLIO
=========================

Dari: ${name}
Email: ${email}

Pesan:
${message}

---
Balas email ini untuk langsung membalas ke ${email}
          `.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Fallback: Log the message (for development/testing)
    console.log("=== New Contact Form Submission ===");
    console.log(`To: ${recipientEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log("===================================");

    // Return success even without email service (for demo purposes)
    // In production, you should configure an email service
    return NextResponse.json(
      {
        success: true,
        message: "Message received",
        note: "Configure RESEND_API_KEY for actual email delivery",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
