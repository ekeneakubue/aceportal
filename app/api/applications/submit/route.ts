import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate a unique application number
    const applicationNumber = `ACE${new Date().getFullYear()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    // Create the application in the database
    const application = await prisma.application.create({
      data: {
        ...data,
        applicationNumber,
        status: 'PENDING',
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationNumber: application.applicationNumber,
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

