import React, { useState } from "react";

const TaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({ title: "", start: "", end: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    const taskWithId = { ...newTask, id: Date.now() };
    onAddTask(taskWithId);
    setNewTask({ title: "", start: "", end: "" });
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
        />
        <input
          type="datetime-local"
          name="start"
          value={newTask.start}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="end"
          value={newTask.end}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.start} - {task.end})
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
