import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET recent users (last 5, excluding SUPER_ADMIN)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for Center_Leader role
    
    const users = await prisma.user.findMany({
      where: {
        role: {
          notIn: ['SUPER_ADMIN', 'Center_Leader'], // Center Leaders cannot view SUPER_ADMIN or other Center_Leader users
        },
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        surname: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching recent users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch recent users' },
      { status: 500 }
    );
  }
}

