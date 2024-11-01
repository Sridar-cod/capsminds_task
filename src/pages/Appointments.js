import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar, 
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment } from "../slices/appointmentsSlices";

const AppointmentCard = ({ appointment, onDelete }) => (
  <Card sx={{ mb: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" color="primary">
        {appointment.name}
      </Typography>
      <Typography>Contact: {appointment.contact}</Typography>
      <Typography>Reason: {appointment.reason}</Typography>
    </CardContent>
    <Button size="small" color="error" onClick={onDelete}>
      Cancel Appointment
    </Button>
  </Card>
);

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const savedAppointments = useSelector(
    (state) => state.scheduleInfo.appointments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAppointments(savedAppointments || []);
  }, [savedAppointments]);

  const handleDelete = useCallback((index) => {
    setAppointmentToDelete(index);
    setOpenDialog(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (appointmentToDelete !== null) {
      dispatch(deleteAppointment(appointmentToDelete));
      setSnackbarMessage('Appointment deleted successfully!'); 
      setSnackbarOpen(true); 
    }
    setOpenDialog(false);
    setAppointmentToDelete(null);
  }, [dispatch, appointmentToDelete]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToDelete(null);
  };

  const handleSnackbarClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          <Button variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this appointment?
          </Typography>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage} 
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default Appointments;
