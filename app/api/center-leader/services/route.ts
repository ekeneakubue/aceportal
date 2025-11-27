import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all services
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for Center_Leader role
    
    const services = await prisma.service.findMany({
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
      services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch services' 
      },
      { status: 500 }
    );
  }
}

// POST create new service
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for Center_Leader role
    
    const body = await request.json();
    const {
      title,
      slug,
      subtitle,
      description,
      icon,
      color,
      totalCourses,
      displayOrder,
      isActive,
    } = body;

    // Validate required fields
    if (!title || !slug || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, and description are required' },
        { status: 400 }
      );
    }

    // Check if service with slug already exists
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService) {
      return NextResponse.json(
        { success: false, message: 'Service with this slug already exists' },
        { status: 400 }
      );
    }

    // Create service
    const service = await prisma.service.create({
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description,
        icon: icon || null,
        color: color || null,
        totalCourses: totalCourses !== undefined ? totalCourses : 0,
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      service,
      message: 'Service created successfully',
    });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create service',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

