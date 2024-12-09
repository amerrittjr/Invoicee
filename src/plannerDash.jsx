import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import "./uniDash.css";

const Planner = () => {
  const [plannerData, setPlannerData] = useState([]);
  const client = new Client();
  const databases = new Databases(client);

  const databaseId = process.env.REACT_APP_APPWRITE_INVOICE_DATABASE_ID;
  const collectionId = process.env.REACT_APP_APPWRITE_PLANNER_COLLECTION_ID;

  useEffect(() => {
    client
      .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
      .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

    fetchPlannerData();
  }, []);

  const fetchPlannerData = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      setPlannerData(response.documents);
    } catch (error) {
      console.error("Error fetching planner data:", error);
    }
  };

  const handleAddTask = async (day) => {
    const title = prompt("Enter Task Title:");
    const description = prompt("Enter Task Description:");
    const time = prompt("Enter Task Time (e.g., 02:00):");

    if (title && time) {
      try {
        const response = await databases.createDocument(
          databaseId,
          collectionId,
          {
            title,
            description,
            time,
            day,
          }
        );
        setPlannerData((prev) => [...prev, response]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="planner">
      <div className="sidebar">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/50"
            alt="User"
            className="user-avatar"
          />
          <h3>Jane Numbers</h3>
          <p>46% | 21h 30min</p>
        </div>
        <button className="add-task-btn" onClick={() => handleAddTask()}>
          Add Task
        </button>
      </div>
      <div className="planner-main">
        <div className="planner-header">
          <h2>December 2024 Week 49</h2>
          <div className="navigation">
            <button>{"< Previous"}</button>
            <button>Current</button>
            <button>Next</button>
          </div>
        </div>
        <div className="planner-grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-column">
              <h3>{day}</h3>
              <button
                className="add-task-btn"
                onClick={() => handleAddTask(day)}
              >
                + Add Task
              </button>
              <div className="task-list">
                {plannerData
                  .filter((task) => task.day === day)
                  .map((task) => (
                    <div key={task.$id} className="task-card">
                      <p className="task-time">{task.time}</p>
                      <p className="task-title">{task.title}</p>
                      <p className="task-description">{task.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
