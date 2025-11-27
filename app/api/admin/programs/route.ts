import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all programs
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for SUPER_ADMIN or Center_Leader role
    
    const programs = await prisma.program.findMany({
      include: {
        service: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: [
        {
          displayOrder: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      programs,
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

// POST create new program
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for SUPER_ADMIN or Center_Leader role
    
    const body = await request.json();
    const {
      title,
      slug,
      level,
      duration,
      studyMode,
      fee,
      brochure,
      overview,
      objectives,
      curriculum,
      requirements,
      careerPaths,
      serviceId,
      displayOrder,
      isActive,
    } = body;

    // Validate all required fields
    if (!title || !slug || !level || !overview) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, level, and overview are required' },
        { status: 400 }
      );
    }
    
    if (!duration) {
      return NextResponse.json(
        { success: false, message: 'Duration is required' },
        { status: 400 }
      );
    }
    
    if (!studyMode) {
      return NextResponse.json(
        { success: false, message: 'Study mode is required' },
        { status: 400 }
      );
    }
    
    if (!fee) {
      return NextResponse.json(
        { success: false, message: 'Fee is required' },
        { status: 400 }
      );
    }
    
    if (!brochure) {
      return NextResponse.json(
        { success: false, message: 'Brochure is required' },
        { status: 400 }
      );
    }
    
    if (!serviceId) {
      return NextResponse.json(
        { success: false, message: 'Service is required' },
        { status: 400 }
      );
    }
    
    if (!objectives || !Array.isArray(objectives) || objectives.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one learning objective is required' },
        { status: 400 }
      );
    }
    
    if (!curriculum || !Array.isArray(curriculum) || curriculum.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one curriculum module is required' },
        { status: 400 }
      );
    }
    
    if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one requirement is required' },
        { status: 400 }
      );
    }
    
    if (!careerPaths || !Array.isArray(careerPaths) || careerPaths.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one career path is required' },
        { status: 400 }
      );
    }

    // Validate level enum
    const validLevels = ['CERTIFICATE', 'DIPLOMA', 'BACHELORS', 'MASTERS', 'PHD', 'MASTERS_AND_PHD'];
    if (!validLevels.includes(level)) {
      return NextResponse.json(
        { success: false, message: `Invalid level. Must be one of: ${validLevels.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if program with slug already exists
    const existingProgram = await prisma.program.findUnique({
      where: { slug },
    });

    if (existingProgram) {
      return NextResponse.json(
        { success: false, message: 'Program with this slug already exists' },
        { status: 400 }
      );
    }

    // Create program
    const program = await prisma.program.create({
      data: {
        title,
        slug,
        level,
        duration,
        studyMode,
        fee,
        brochure,
        overview,
        objectives,
        curriculum,
        requirements,
        careerPaths,
        serviceId,
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      program,
      message: 'Program created successfully',
    });
  } catch (error: any) {
    console.error('Error creating program:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create program',
        error: error.message || 'Unknown error',
        code: error.code || 'UNKNOWN',
        details: process.env.NODE_ENV === 'development' ? error.meta : undefined,
      },
      { status: 500 }
    );
  }
}

