import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (!task) return;
    if (isEditing) {
      setTasks(tasks.map(t => (t.id === editId ? { ...t, text: task } : t)));
      setTask("");
      setEditId(null);
      setIsEditing(false);
    } else {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const toEdit = tasks.find(task => task.id === id);
    setTask(toEdit.text);
    setEditId(id);
    setIsEditing(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-center mb-4">To-Do App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? <FaCheck /> : "Add"}
        </button>
      </div>
      <ul>
        {tasks.map(({ id, text }) => (
          <li
            key={id}
            className="flex items-center justify-between p-2 mb-2 bg-white rounded-md shadow-md"
          >
            <span>{text}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => editTask(id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTask(id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
