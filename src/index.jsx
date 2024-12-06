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
