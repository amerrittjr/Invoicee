import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskList from "./taskList";
import AnalyticsDashboard from "./analyticsDashboard";

const localizer = momentLocalizer(moment);

const PlannerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Planner Dashboard</h1>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onAddTask={handleAddTask}
        onUpdateTask={handleTaskUpdate}
        onDeleteTask={handleTaskDelete}
      />

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={tasks.map((task) => ({
          title: task.title,
          start: new Date(task.start),
          end: new Date(task.end),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "20px 0" }}
      />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard tasks={tasks} />
    </div>
  );
};

export default PlannerDashboard;
