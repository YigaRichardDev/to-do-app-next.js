"use client";

import { useEffect, useState } from 'react';
import { Task } from 'types/task';
import { getTasks, createTask, updateTask, deleteTask } from 'services/taskServices';
import TaskTable from 'compontents/Table';
import TaskModal from 'compontents/CreatTaskModal';
import ConfirmDeleteModal from 'compontents/DeleteTaskModal';
import { Button, Snackbar } from '@mui/material';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<Task | null>(null)
  const [message, setMessage] = useState<string>('')

  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAddTask = async (title: string) => {
    const newTask = await createTask(title)
    setTasks([...tasks, newTask])
    setOpenModal(false)
    setMessage('Task added successfully')
  }

  const handleToggle = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed })
    loadTasks()
  }

  const handleDelete = async () => {
    if (deleteTaskId) {
      await deleteTask(deleteTaskId.id)
      setDeleteTaskId(null)
      loadTasks()
      setMessage('Task deleted')
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Task
        </Button>
      </div>

      <TaskTable
        tasks={tasks}
        onStatusToggle={handleToggle}
        onDelete={(task) => setDeleteTaskId(task)}
      />

      <TaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddTask}
      />

      <ConfirmDeleteModal
        open={!!deleteTaskId}
        onCancel={() => setDeleteTaskId(null)}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        message={message}
        onClose={() => setMessage('')}
      />
    </main>
  )
}
