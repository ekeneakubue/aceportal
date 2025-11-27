interface AdmissionEmailParams {
  email: string;
  firstname: string;
  surname: string;
  programChoice: string;
  admissionSession: string;
  applicationNumber?: string | null;
}

export async function sendAdmissionApprovedEmail(params: AdmissionEmailParams) {
  // For now, just log to the server console so builds do not depend on nodemailer.
  // You can replace this with a real email service (Resend, SendGrid, etc.) later.
  console.log('[Admission Approved Email]', {
    to: params.email,
    firstname: params.firstname,
    surname: params.surname,
    programChoice: params.programChoice,
    admissionSession: params.admissionSession,
    applicationNumber: params.applicationNumber,
  });
}


