import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';


export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { title } = body;

    const trimmedTitle = title?.trim();

    //  Validate input
    if (!trimmedTitle || typeof trimmedTitle !== 'string' || trimmedTitle.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Title is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    //  Check for duplicates
    const existing = await prisma.task.findFirst({
      where: { title: trimmedTitle },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'A task with this title already exists.' },
        { status: 409 } // Conflict
      );
    }

    //  Create the task
    const task = await prisma.task.create({
      data: {
        title: trimmedTitle,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Task created successfully.', data: task },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/tasks error:', error);

    return NextResponse.json(
      { success: false, message: 'Something went wrong.', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    //  If ID is provided, fetch one task
    if (id) {
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        return NextResponse.json(
          { success: false, message: 'Invalid task ID. Must be a number.' },
          { status: 400 }
        );
      }

      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        return NextResponse.json(
          { success: false, message: 'Task not found.' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Task fetched successfully.', data: task },
        { status: 200 }
      );
    }

    //  Else, fetch all tasks
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      { success: true, message: 'Tasks fetched successfully.', data: tasks },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('GET /api/tasks error:', error);

    return NextResponse.json(
      { success: false, message: 'Something went wrong.', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, title, completed } = body;

    //  Validate ID
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Task ID must be provided as a number.' },
        { status: 400 }
      );
    }

    //  Validate input fields
    if (title && (typeof title !== 'string' || title.trim().length === 0)) {
      return NextResponse.json(
        { success: false, message: 'Title must be a non-empty string.' },
        { status: 400 }
      );
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Completed must be a boolean.' },
        { status: 400 }
      );
    }

    //  Check if task exists
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      return NextResponse.json(
        { success: false, message: 'Task not found.' },
        { status: 404 }
      );
    }

    //  Perform update
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Task updated successfully.', data: updatedTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('PATCH /api/tasks error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    //  Validate ID
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Task ID must be provided as a number.' },
        { status: 400 }
      );
    }

    //  Check if the task exists
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return NextResponse.json(
        { success: false, message: 'Task not found.' },
        { status: 404 }
      );
    }

    //  Delete the task
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Task deleted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE /api/tasks error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.', error: error.message },
      { status: 500 }
    );
  }
}