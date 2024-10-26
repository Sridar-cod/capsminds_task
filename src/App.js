import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ConditionDetail from "./pages/ConditionDetail";
import DoctorDetail from "./pages/DoctorDetail";
import { Container } from "@mui/material";
import AppointmentForm from "./components/appointmentForm/AppointmentForm";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/conditions/:id" element={<ConditionDetail />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/schedule" element={<AppointmentForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
