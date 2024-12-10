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
import InvoiceForm from "./invoiceForm";
import InvoiceDash from "./invoice/invoiceDash";
import PlannerDashboard from "./planner/plannerDash";
import TaskList from "./planner/taskList";
import AnalyticsDashboard from "./planner/analyticsDashboard";

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
          <Route path="/invoiceForm" element={<InvoiceForm />} />
          <Route path="/invoiceDash" element={<InvoiceDash />} />
          <Route path="/plannerDash" element={<PlannerDashboard />} />
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/analyticsDashboard" element={<AnalyticsDashboard />} />

          {}
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
