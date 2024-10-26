import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationView from "./ConfirmationView";

const saveToLocalStorage = (key, data) => {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  existingData.push(data);
  localStorage.setItem(key, JSON.stringify(existingData));
};

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    reason: "",
  });
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.contact && formData.reason) {
      saveToLocalStorage("appointments", formData);
      setConfirmation(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", contact: "", reason: "" });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 500, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Schedule Appointment
          </Typography>

          {confirmation ? (
            <ConfirmationView
              formData={formData}
              onBackToHome={() => {
                navigate("/");
                resetForm();
              }}
              onViewAppointments={() => navigate("/appointments")}
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Confirm Appointment
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AppointmentForm;

