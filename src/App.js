import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ConditionDetail from "./pages/ConditionDetail";
import DoctorDetail from "./pages/DoctorDetail";
import AppointmentForm from "./components/appointmentForm/AppointmentForm";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/conditions/:id" element={<ConditionDetail />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/doctors/:id/schedule" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
