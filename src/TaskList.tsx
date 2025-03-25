import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
}

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string) => void;
  updatePriority: (id: number, newPriority: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask, updateTask, updatePriority }) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
          updatePriority={updatePriority}
        />
      ))}
    </ul>
  );
};

export default TaskList;
