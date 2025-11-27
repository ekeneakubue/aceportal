import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendAdmissionApprovedEmail } from '@/lib/email';

// GET all postgraduate applications (main Application model)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization for admin roles
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstname: { contains: search, mode: 'insensitive' as any } },
        { surname: { contains: search, mode: 'insensitive' as any } },
        { email: { contains: search, mode: 'insensitive' as any } },
        { phoneNumber: { contains: search, mode: 'insensitive' as any } },
        { applicationNumber: { contains: search, mode: 'insensitive' as any } },
        { programChoice: { contains: search, mode: 'insensitive' as any } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// PATCH update a single application (e.g. status)
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization checks
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Application id and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'AWAITING_PAYMENT'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Fetch existing application to detect status change
    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status },
    });

    // If status changed from non-approved to APPROVED, send congratulatory email
    if (existing.status !== 'APPROVED' && status === 'APPROVED') {
      try {
        await sendAdmissionApprovedEmail({
          email: updated.email,
          firstname: updated.firstname,
          surname: updated.surname,
          programChoice: updated.programChoice,
          admissionSession: updated.admissionSession,
          applicationNumber: updated.applicationNumber,
        });
      } catch (emailError) {
        console.error('Failed to send admission email:', emailError);
        // Do not fail the request because of email errors
      }
    }

    return NextResponse.json({
      success: true,
      application: updated,
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE a single application
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization checks
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application id is required' },
        { status: 400 }
      );
    }

    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete application' },
      { status: 500 }
    );
  }
}


