import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'
import AddTaskForm from './AddTaskForm'
import { Search } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; priority: string }[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: string, priority: string) => {
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority }]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const searchTextMatch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;
    return searchTextMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            My To-Do List
          </h1>
        </div>

        {/* Add Task Form */}
        <AddTaskForm addTask={addTask} />

        {/* Search and Filter Container */}
        <div className="flex flex-row space-x-2 mt-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App
