import nodemailer from 'nodemailer';

interface AdmissionEmailParams {
  email: string;
  firstname: string;
  surname: string;
  programChoice: string;
  admissionSession: string;
  applicationNumber?: string | null;
}

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      'SMTP configuration missing (SMTP_HOST, SMTP_USER, SMTP_PASS). Skipping email send.'
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export async function sendAdmissionApprovedEmail(params: AdmissionEmailParams) {
  const transporter = getTransporter();
  if (!transporter) {
    return;
  }

  const from =
    process.env.SMTP_FROM || `"ACE-SPED Admissions" <${process.env.SMTP_USER}>`;

  const subject = 'ACE-SPED Admission Offer';
  const greetingName = params.firstname || params.email;

  const lines: string[] = [];
  lines.push(`Dear ${greetingName},`);
  lines.push('');
  lines.push('Congratulations! 🎉');
  lines.push(
    `We are pleased to inform you that your application has been APPROVED for the program:`
  );
  lines.push(`- Program: ${params.programChoice}`);
  lines.push(`- Session: ${params.admissionSession}`);
  if (params.applicationNumber) {
    lines.push(`- Application Number: ${params.applicationNumber}`);
  }
  lines.push('');
  lines.push(
    'Please check your portal and email regularly for further instructions regarding registration, documentation, and resumption.'
  );
  lines.push('');
  lines.push('Best regards,');
  lines.push('ACE-SPED Admissions Office');

  const text = lines.join('\n');
  const html = text
    .replace(/\n/g, '<br/>')
    .replace('Congratulations! 🎉', '<strong>Congratulations! 🎉</strong>');

  await transporter.sendMail({
    from,
    to: params.email,
    subject,
    text,
    html: `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; line-height: 1.6;">${html}</div>`,
  });
}


