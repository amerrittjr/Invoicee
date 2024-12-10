import React from "react";

const AnalyticsDashboard = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.progress === 100).length;

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Tasks",
        data: [completedTasks, tasks.length - completedTasks],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div>
      <h2>Analytics Dashboard</h2>
    </div>
  );
};

export default AnalyticsDashboard;
