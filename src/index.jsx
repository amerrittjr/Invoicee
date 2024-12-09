import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext";
import "./index.css";
import "./preset.css";
import SignUpForm from "./signUpForm";
import LoginPage from "./loginPage";
import Dashboard from "./dashboard";
import Navbar from "./nav";
import LandingPage from "./landingPage";
import InvoiceForm from "./invoiceForm"; // Updated path
import InvoiceDash from "./invoiceDashHome"; // Updated path
import CalendarDash from "./calendarDash";
import PlannerDash from "./plannerDash";
import TaskDash from "./taskDash";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoice" element={<InvoiceDash />} />
          <Route path="/calendar" element={<CalendarDash />} />
          <Route path="/invoiceForm" element={<InvoiceForm />} />
          <Route path="/planner" element={<PlannerDash />} />
          <Route path="/tasks" element={<TaskDash />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
