import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface ListMenuProps {
  lists: string[];
  currentList: string;
  setCurrentList: (listName: string) => void;
  onCreateNewList: () => void;
  onRenameList: (oldName: string, newName: string) => void;
  onDeleteList: (listName: string) => void;
}

const ListMenu: React.FC<ListMenuProps> = ({ lists, currentList, setCurrentList, onCreateNewList, onRenameList, onDeleteList }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renameMode, setRenameMode] = useState<{ listName: string; newName: string } | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRename = (listName: string) => {
    setRenameMode({ listName, newName: listName });
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (renameMode) {
      setRenameMode({ ...renameMode, newName: e.target.value });
    }
  };

  const saveRename = () => {
    if (renameMode) {
      onRenameList(renameMode.listName, renameMode.newName);
      setRenameMode(null);
    }
  };

  const handleDelete = (listName: string) => {
    if (window.confirm(`Are you sure you want to delete "${listName}"?`)) {
      onDeleteList(listName);
      if (listName === currentList && lists.length > 0) {
        setCurrentList(lists.filter(list => list !== listName)[0] || '');
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleMenu} type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
          <Menu className="h-5 w-5 mr-2" aria-hidden="true" />
          Options
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
          <div className="py-1" role="none">
            {lists.map((listName) => (
              <div key={listName} className="flex items-center px-4 py-2 text-sm" role="none">
                {renameMode?.listName === listName ? (
                  <input
                    type="text"
                    value={renameMode.newName}
                    onChange={handleRenameChange}
                    onBlur={saveRename}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveRename();
                      }
                    }}
                    autoFocus
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <button
                    onClick={() => {
                      setCurrentList(listName);
                      setIsMenuOpen(false);
                    }}
                    className={`block px-2 py-1 text-sm w-full text-left rounded-md
                      ${listName === currentList ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-orange-200'}
                    `}
                  >
                    {listName}
                  </button>
                )}
                <div className="ml-2 space-x-2">
                  <button onClick={() => handleRename(listName)} className="text-gray-500 hover:text-gray-700 text-xs">
                    Rename
                  </button>
                  <button onClick={() => handleDelete(listName)} className="text-red-500 hover:text-red-700 text-xs">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={onCreateNewList}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              + Create New List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListMenu;
