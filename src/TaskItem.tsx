import React from 'react'
import { Trash2, CheckCircle, Circle } from 'lucide-react'

interface Task {
  id: number
  text: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  deleteTask: (id: number) => void
  toggleComplete: (id: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleComplete,
}) => {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => toggleComplete(task.id)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {task.completed ? (
            <CheckCircle className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>
        <span
          className={
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="h-6 w-6" />
      </button>
    </li>
  )
}

export default TaskItem
