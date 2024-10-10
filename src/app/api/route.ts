// src/app/api/todo/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { TodoData } from '../types/todo';

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

export async function GET() {
    try {
    const keys = await kv.keys('*');
    const todos = await Promise.all(
      keys.map(async (key) => await kv.get<TodoData>(key))
    );
    return NextResponse.json(todos.filter(Boolean));
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const todo = await request.json() as TodoData;
    if (!todo.id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
    }
    await kv.set(todo.id, todo, { ex: ONE_WEEK_IN_SECONDS });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to create/update todo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 });
  }

  try {
    const deletedCount = await kv.del(id);
    if (deletedCount === 1) {
      return NextResponse.json({ message: 'Todo deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}