import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single service by slug (public endpoint)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const service = await prisma.service.findUnique({
      where: { 
        slug,
        isActive: true,
      },
      include: {
        programs: {
          where: {
            isActive: true,
          },
          orderBy: [
            { displayOrder: 'asc' },
            { createdAt: 'desc' },
          ],
          select: {
            id: true,
            title: true,
            slug: true,
            level: true,
            duration: true,
            studyMode: true,
            fee: true,
            brochure: true,
            overview: true,
            objectives: true,
            curriculum: true,
            requirements: true,
            careerPaths: true,
            isActive: true,
            displayOrder: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Fetch programs from database - ensure we're getting all active programs for this service
    const programs = service.programs || [];
    
    // Log for debugging
    console.log(`Service "${service.title}" (${slug}) has ${programs.length} active programs`);
    if (programs.length > 0) {
      console.log(`Programs: ${programs.map((p: any) => p.title).join(', ')}`);
    }

    // Map programs to courses for backward compatibility
    // Update totalCourses to reflect actual program count
    const programCount = programs.length;
    const serviceWithCourses = {
      ...service,
      programs: programs, // Keep programs array with all details
      courses: programs, // Also map to courses for backward compatibility
      totalCourses: programCount > 0 ? programCount : service.totalCourses || 0,
    };

    return NextResponse.json({
      success: true,
      service: serviceWithCourses,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

