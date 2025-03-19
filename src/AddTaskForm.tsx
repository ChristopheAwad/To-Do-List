import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface AddTaskFormProps {
  addTask: (newTask: string, priority: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask, priority);
      setNewTask('');
      setPriority('medium'); // Reset to default after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-2">
      <div className="flex-grow">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>
      <div className="flex items-center space-x-2">
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
