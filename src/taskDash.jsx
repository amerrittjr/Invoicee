import React, { useState } from "react";
import { Client, Databases } from "appwrite";
import "./uniDash.css";

const TaskDash = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("Planned");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [endDate, setEndDate] = useState("");

  const client = new Client();
  const databases = new Databases(client);

  const handleAddTask = async () => {
    if (!taskTitle || !endDate) return; // Ensure title and end date are provided

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: status,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await databases.createDocument(
        "YOUR_DATABASE_ID",
        "YOUR_COLLECTION_ID",
        newTask
      );
      setTasks([...tasks, response]);
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setStatus("Planned");
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate("");
  };

  const toggleStatus = (task) => {
    const updatedStatus =
      task.status === "Planned"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Planned";
    task.status = updatedStatus;
    setTasks([...tasks]);
    // Optionally, update the status in the database
  };

  return (
    <div className="task-manager">
      <div className="task-form">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <div className="date-fields">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.$id}
            className={`task-card ${task.status.toLowerCase()}`}
          >
            <div className="task-header">
              <h3>{task.title}</h3>
              <button onClick={() => toggleStatus(task)}>{task.status}</button>
            </div>
            <p>{task.description}</p>
            <p>
              <strong>Start Date:</strong> {task.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {task.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDash;
