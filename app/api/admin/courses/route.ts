import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all courses
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for SUPER_ADMIN or Center_Leader role
    
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get('programId');

    const where = programId ? { programId } : {};

    const courses = await prisma.course.findMany({
      where,
      include: {
        program: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST create new course
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for SUPER_ADMIN or Center_Leader role
    
    const body = await request.json();
    const {
      title,
      slug,
      programId,
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
      isActive,
      displayOrder,
    } = body;

    // Validate required fields
    if (!title || !slug || !programId || !level || !overview) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, programId, level, and overview are required' },
        { status: 400 }
      );
    }

    // Check if program exists
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      return NextResponse.json(
        { success: false, message: 'Program not found' },
        { status: 400 }
      );
    }

    // Check if course with slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    });

    if (existingCourse) {
      return NextResponse.json(
        { success: false, message: 'Course with this slug already exists' },
        { status: 400 }
      );
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        programId,
        level,
        duration: duration || null,
        studyMode: studyMode || null,
        fee: fee || null,
        brochure: brochure || null,
        overview,
        objectives: objectives || null,
        curriculum: curriculum || null,
        requirements: requirements || null,
        careerPaths: careerPaths || null,
        isActive: isActive !== undefined ? isActive : true,
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
      },
      include: {
        program: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // Update program's totalCourses count
    const courseCount = await prisma.course.count({
      where: { programId },
    });

    await prisma.program.update({
      where: { id: programId },
      data: { totalCourses: courseCount },
    });

    return NextResponse.json({
      success: true,
      course,
      message: 'Course created successfully',
    });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create course',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

