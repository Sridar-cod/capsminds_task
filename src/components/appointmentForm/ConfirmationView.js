import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const ConfirmationView = ({ formData, onBackToHome, onViewAppointments }) => {
  return (
<>
    <Typography variant="body1" color="textSecondary" gutterBottom>
      Appointment confirmed for:
    </Typography>
      <Box
        sx={{ my: 2 }}>
      <Typography variant="h6" color="primary">
        Name:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formData.name}
      </Typography>
      <Typography variant="h6" color="primary" mt={2}>
        Contact:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formData.contact}
      </Typography>
      <Typography variant="h6" color="primary" mt={2}>
        Reason:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formData.reason}
      </Typography>
    </Box>
    <Button onClick={onViewAppointments} variant="contained" color="primary">
      View Appointments
    </Button>
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={onBackToHome}>
        Back to Home
      </Button>
    </Box>
  </>  )
}

export default ConfirmationView