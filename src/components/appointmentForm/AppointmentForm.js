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
import { useDispatch } from "react-redux";
import { setAppointments } from "../../slices/appointmentsSlices";

const saveToLocalStorage = (key, data) => {
  // const existingData = JSON.parse(localStorage.getItem(key)) || [];
  // existingData.push(data);
  // localStorage.setItem(key, JSON.stringify(existingData));
};

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    reason: "",
  });
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.contact && formData.reason) {
      dispatch(setAppointments(formData));
      // saveToLocalStorage("appointments", formData);
      setConfirmation(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", contact: "", reason: "" });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
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
                label={
                  <>
                    Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                inputProps={{ "aria-required": true }}
                margin="normal"
              />
              <TextField
                type="number"
                label={
                  <>
                    Contact <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                fullWidth
                inputProps={{ "aria-required": true }}
                margin="normal"
              />
              <TextField
                label={
                  <>
                    Reason <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                inputProps={{ "aria-required": true }}
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
