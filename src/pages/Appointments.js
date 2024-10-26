import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment, onDelete }) => (
  <Card sx={{ mb: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" color="primary">{appointment.name}</Typography>
      <Typography>Contact: {appointment.contact}</Typography>
      <Typography>Reason: {appointment.reason}</Typography>
    </CardContent>
    <Button size="small" color="error" onClick={onDelete}>Cancel Appointment</Button>
  </Card>
);

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  const handleDelete = useCallback((index) => {
    setAppointmentToDelete(index); 
    setOpenDialog(true); 
  }, []);

  const confirmDelete = useCallback(() => {
    const updatedAppointments = appointments.filter((_, i) => i !== appointmentToDelete);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setOpenDialog(false); 
    setAppointmentToDelete(null); 
  }, [appointments, appointmentToDelete]);

  const handleCloseDialog = () => {
    setOpenDialog(false); 
    setAppointmentToDelete(null); 
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Scheduled Appointments
      </Typography>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <AppointmentCard 
            key={index} 
            appointment={appointment} 
            onDelete={() => handleDelete(index)} 
          />
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center">
          No appointments scheduled yet.
        </Typography>
      )}
      <Box textAlign="center" mt={4}>
        <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
          <Button variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;

