import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.json();

    // Format goals array
    const goalsText = formData.goals?.length > 0
      ? formData.goals.join(', ')
      : 'Not specified';

    // Build email content
    const emailContent = `
New Contact Form Submission from maemo.be

═══════════════════════════════════════════

COMPANY INFORMATION
───────────────────────────────────────────
Company Name: ${formData.companyName || 'Not provided'}
Website: ${formData.website || 'Not provided'}
Sector: ${formData.sector || 'Not specified'}
Region: ${formData.region || 'Not specified'}

COMPANY DETAILS
───────────────────────────────────────────
Team Size: ${formData.teamSize || 'Not specified'}
Revenue: ${formData.revenue || 'Not specified'}

PROJECT DETAILS
───────────────────────────────────────────
Goals: ${goalsText}
Timing: ${formData.timing || 'Not specified'}

CONTACT INFORMATION
───────────────────────────────────────────
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Invitation Code: ${formData.invitationCode || 'None'}

═══════════════════════════════════════════
Submitted at: ${new Date().toLocaleString('nl-BE', { timeZone: 'Europe/Brussels' })}
    `.trim();

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'maemo.be <onboarding@resend.dev>',
      to: 'info@maemo.be',
      replyTo: formData.email || undefined,
      subject: `[maemo.be] New inquiry from ${formData.companyName || formData.name || 'Unknown'}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
