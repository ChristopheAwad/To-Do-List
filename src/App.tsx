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

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-between items-center">
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
            className={`${
              darkMode ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
            <span className="absolute inset-0 flex items-center justify-center transition-opacity">
              {darkMode ? (
                <Moon className="h-4 w-4 text-gray-200" strokeWidth={2} />
              ) : (
                <Sun className="h-4 w-4 text-gray-700" strokeWidth={2} />
              )}
            </span>
          </Switch>
        </div>

        <div>
          <h1 className="text-center text-3xl font-extrabold">
            {currentList}
          </h1>
        </div>

        <AddTaskForm addTask={addTask} />
        <div className="relative mt-4 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
