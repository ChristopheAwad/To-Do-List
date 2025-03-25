import React, { useState } from 'react'
import { Trash, CheckCircle, Circle, Edit, Check, X, ChevronDown } from 'lucide-react'

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
  updatePriority: (id: number, newPriority: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleComplete,
  updateTask,
  updatePriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const handleUpdate = () => {
    if (editedText.trim()) {
      updateTask(task.id, editedText);
      updatePriority(task.id, editedPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(task.text);
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  const handlePriorityChange = (newPriority: string) => {
    setEditedPriority(newPriority);
    setShowPriorityMenu(false);
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
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdate();
                  }
                }}
                autoFocus
                className="text-sm border rounded-md p-1 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdate}
                className="text-green-600 hover:text-green-700 p-1 rounded-md focus:outline-none"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-700 p-1 rounded-md focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
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
          {isEditing && (
            <div className="relative">
              <button
                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                className="flex items-center text-gray-600 hover:text-blue-500 p-1 rounded-md focus:outline-none"
              >
                <span className="text-sm mr-1">Priority</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showPriorityMenu && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => handlePriorityChange('high')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      High
                    </button>
                    <button
                      onClick={() => handlePriorityChange('medium')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => handlePriorityChange('low')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Low
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
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
