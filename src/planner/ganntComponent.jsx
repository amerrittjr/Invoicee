import React from "react";
import Gantt from "react-gantt-chart";

const GanttChart = ({ tasks }) => {
  const ganttData = tasks.map((task) => ({
    id: task.id,
    name: task.title,
    start: new Date(task.start),
    end: new Date(task.end),
    progress: 0,
  }));

  return (
    <div>
      <h2>Gantt Chart</h2>
      <Gantt tasks={ganttData} />
    </div>
  );
};

export default GanttChart;
