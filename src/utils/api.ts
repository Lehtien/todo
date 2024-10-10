// src/utils/api.ts

import { TodoData } from '../app/types/todo';

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || response.statusText);
  }
  return response.json();
}

export async function fetchTodos(): Promise<TodoData[]> {
  const response = await fetch(API_BASE);
  return handleResponse<TodoData[]>(response);
}

export async function createTodo(todo: TodoData): Promise<TodoData> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
}

export async function updateTodo(todo: TodoData): Promise<TodoData> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return handleResponse<TodoData>(response);
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}?id=${id}`, { method: 'DELETE' });
  await handleResponse<void>(response);
}