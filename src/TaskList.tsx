import React from 'react'
import TaskItem from './TaskItem'

interface Task {
  id: number
  text: string
  completed: boolean
  priority: string
}

interface TaskListProps {
  tasks: Task[]
  deleteTask: (id: number) => void
  toggleComplete: (id: number) => void
  updateTask: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  toggleComplete,
  updateTask
}) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          updateTask={updateTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
