import React, { useState } from 'react'
import { Trash, CheckCircle, Circle, Edit } from 'lucide-react'

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
}

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  updateTask: (id: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleComplete,
  updateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleUpdate = () => {
    if (editedText.trim()) {
      updateTask(task.id, editedText);
      setIsEditing(false);
    }
  };

  const priorityClass = task.priority === 'high' ? 'priority-high' :
    task.priority === 'medium' ? 'priority-medium' : 'priority-low';

  return (
    <li className={`task-item ${task.completed ? 'task-item-completed' : 'task-item-pending'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleComplete(task.id)}
            className={`rounded-full focus:outline-none ${
              task.completed ? 'bg-green-200' : 'border border-gray-300'
            }`}
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
          <span className={`priority-dot ${priorityClass}`}></span>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUpdate();
                }
              }}
              autoFocus
              className="text-sm border rounded-md p-1 focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span
              className={`text-sm ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {task.text}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? null : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-blue-500 p-1 rounded-md focus:outline-none"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-600 hover:text-red-500 p-1 rounded-md focus:outline-none"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
