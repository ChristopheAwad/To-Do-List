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
  const [lists, setLists] = useState({ "My Tasks": [] });
  const [currentList, setCurrentList] = useState("My Tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
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
    const storedTasks = localStorage.getItem(`${currentList}-tasks`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [currentList]);

  useEffect(() => {
    localStorage.setItem(`${currentList}-tasks`, JSON.stringify(tasks));
  }, [tasks, currentList]);

  const addTask = (text: string, priority: string) => {
    const newTask = { id: Date.now(), text, completed: false, priority };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const updatePriority = (id: number, newPriority: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const createList = () => {
    const newListName = prompt("Enter new list name:");
    if (newListName) {
      setLists({ ...lists, [newListName]: [] });
      setCurrentList(newListName);
    }
  };

  const renameList = (oldName: string, newName: string) => {
    if (newName) {
      const updatedLists = { ...lists };
      updatedLists[newName] = updatedLists[oldName];
      delete updatedLists[oldName];
      setLists(updatedLists);
      setCurrentList(newName);

      localStorage.setItem(`${newName}-tasks`, localStorage.getItem(`${oldName}-tasks`) || '[]');
      localStorage.removeItem(`${oldName}-tasks`);
    }
  };

  const deleteList = (listName: string) => {
    if (listName === currentList && Object.keys(lists).length > 1) {
      const nextList = Object.keys(lists).find((list) => list !== listName);
      setCurrentList(nextList || "");
    } else if (listName === currentList && Object.keys(lists).length === 1) {
      setLists({});
      setCurrentList("");
      setTasks([]);
    }

    const updatedLists = { ...lists };
    delete updatedLists[listName];
    setLists(updatedLists);

    localStorage.removeItem(`${listName}-tasks`);
  };

  const filteredTasks = tasks.filter((task) =>
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
