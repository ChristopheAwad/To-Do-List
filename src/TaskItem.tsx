import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Edit, Save, X } from 'lucide-react';

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

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSave = () => {
    updateTask(task.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.text); // Reset to original text
  };

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

        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="text-gray-900 border rounded p-1"
          />
        ) : (
          <span
            className={
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }
          >
            {task.text}
          </span>
        )}

        <span
          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColor(
            task.priority
          )} text-white`}
        >
          {task.priority}
        </span>
      </div>

      <div>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 mr-2"
            >
              <Save className="h-6 w-6" />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-6 w-6" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 mr-2"
          >
            <Edit className="h-6 w-6" />
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
