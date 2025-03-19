import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface AddTaskFormProps {
  addTask: (newTask: string) => void
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTask(newTask)
      setNewTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-4 border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-r-md"
      >
        <PlusCircle className="h-6 w-6" />
      </button>
    </form>
  )
}

export default AddTaskForm
