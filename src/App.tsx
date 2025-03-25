import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { Search, Sun, Moon } from 'lucide-react';
import ListMenu from './ListMenu';
import { Switch } from '@headlessui/react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
}

function App() {
  const [lists, setLists] = useState<Record<string, Task[]>>({ "My Tasks": [] });
  const [currentList, setCurrentList] = useState("My Tasks");
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const storedLists = localStorage.getItem('task-lists');
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('task-lists', JSON.stringify(lists));
  }, [lists]);

  const addTask = (text: string, priority: string) => {
    const newTask = { id: Date.now(), text, completed: false, priority };
    setLists(prev => ({
      ...prev,
      [currentList]: [...(prev[currentList] || []), newTask]
    }));
  };

  const toggleComplete = (id: number) => {
    setLists(prev => ({
      ...prev,
      [currentList]: prev[currentList].map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const deleteTask = (id: number) => {
    setLists(prev => ({
      ...prev,
      [currentList]: prev[currentList].filter(task => task.id !== id)
    }));
  };

  const updateTask = (id: number, newText: string) => {
    setLists(prev => ({
      ...prev,
      [currentList]: prev[currentList].map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    }));
  };

  const updatePriority = (id: number, newPriority: string) => {
    setLists(prev => ({
      ...prev,
      [currentList]: prev[currentList].map(task =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    }));
  };

  const createList = () => {
    const newListName = prompt("Enter new list name:");
    if (newListName && !lists[newListName]) {
      setLists(prev => ({ ...prev, [newListName]: [] }));
      setCurrentList(newListName);
    } else if (newListName) {
      alert("List with this name already exists!");
    }
  };

  const renameList = (oldName: string, newName: string) => {
    if (newName && !lists[newName]) {
      setLists(prev => {
        const updatedLists = { ...prev };
        updatedLists[newName] = updatedLists[oldName];
        delete updatedLists[oldName];
        return updatedLists;
      });
      setCurrentList(newName);
    } else if (newName) {
      alert("List with this name already exists!");
    }
  };

  const deleteList = (listName: string) => {
    if (window.confirm(`Are you sure you want to delete "${listName}"?`)) {
      setLists(prev => {
        const updatedLists = { ...prev };
        delete updatedLists[listName];
        return updatedLists;
      });

      if (listName === currentList) {
        const nextList = Object.keys(lists).find(list => list !== listName);
        setCurrentList(nextList || "");
      }
    }
  };

  const filteredTasks = (lists[currentList] || []).filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <ListMenu
            lists={Object.keys(lists)}
            currentList={currentList}
            setCurrentList={setCurrentList}
            onCreateNewList={createList}
            onRenameList={renameList}
            onDeleteList={deleteList}
          />
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className="dark-mode-toggle"
          >
            <span className={`dark-mode-toggle-thumb ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            <span className="absolute inset-0 flex items-center justify-center transition-opacity">
              {darkMode ? (
                <Moon className="h-4 w-4 text-gray-200" strokeWidth={2} />
              ) : (
                <Sun className="h-4 w-4 text-gray-700" strokeWidth={2} />
              )}
            </span>
          </Switch>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {currentList}
        </h1>

        <AddTaskForm addTask={addTask} />
        
        <div className="relative mt-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="search-input"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-3">
          <TaskList
            tasks={filteredTasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            updateTask={updateTask}
            updatePriority={updatePriority}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
