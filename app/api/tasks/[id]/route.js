import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tasks/[id] - Get task by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: task
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, status } = body;

    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: 'Title cannot be empty' },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }
    
    if (description !== undefined) {
      updateData.description = description ? description.trim() : null;
    }
    
    if (status !== undefined) {
      if (!['PENDING', 'COMPLETED'].includes(status)) {
        return NextResponse.json(
          { success: false, error: 'Status must be either PENDING or COMPLETED' },
          { status: 400 }
        );
      }
      updateData.status = status;
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: task
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}