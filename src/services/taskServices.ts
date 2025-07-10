import { Task } from "types/task";

const BASE_URL = '/api/tasks'

// Utility to handle responses consistently
const handleResponse = async (res: Response) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(BASE_URL, { method: 'GET' })
  const data = await handleResponse(res)
  return data.data
}

// Get task by ID
export const getTaskById = async (id: number): Promise<Task> => {
  const res = await fetch(`${BASE_URL}?id=${id}`, { method: 'GET' })
  const data = await handleResponse(res)
  return data.data
}

// Create a new task
export const createTask = async (title: string): Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
  const data = await handleResponse(res)
  return data.data
}

// Update task (title or completed)
export const updateTask = async (
  id: number,
  payload: Partial<Pick<Task, 'title' | 'completed'>>
): Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...payload }),
  })
  const data = await handleResponse(res)
  return data.data
}

// Delete task
export const deleteTask = async (id: number): Promise<void> => {
  const res = await fetch(BASE_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  await handleResponse(res)
}
