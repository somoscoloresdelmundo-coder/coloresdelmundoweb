import { NextResponse } from 'next/server';
import { CONTACT } from '@/config/constants';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
}

const SUBJECT_LABELS: Record<string, string> = {
  volunteer: 'Quiero ser voluntario/a',
  participate: 'Quiero participar en proyectos',
  collaboration: 'Propuesta de colaboración',
  partner: 'Búsqueda de partners Erasmus+',
  info: 'Solicitar información',
  other: 'Otro',
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message || !body.privacy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send an email using a service like Resend, SendGrid, or Nodemailer
    // 2. Store the submission in a database
    // 3. Notify via webhook (Slack, Discord, etc.)

    // For now, we'll log the submission and return success
    // In production, integrate with your email service of choice

    const formattedMessage = `
=== Nuevo mensaje de contacto ===
Nombre: ${body.name}
Email: ${body.email}
Asunto: ${SUBJECT_LABELS[body.subject] || body.subject}
Mensaje: ${body.message}
================================
    `.trim();

    console.log(formattedMessage);

    // Optionally send via mailto (this logs the mailto URL for reference)
    const mailtoUrl = `mailto:${CONTACT.EMAIL}?subject=${encodeURIComponent(
      `[Web] ${SUBJECT_LABELS[body.subject] || body.subject} - ${body.name}`
    )}&body=${encodeURIComponent(
      `De: ${body.name} (${body.email})\n\n${body.message}`
    )}`;

    console.log('Mailto URL:', mailtoUrl);

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
        // Include mailto as fallback option
        fallbackMailto: mailtoUrl
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
