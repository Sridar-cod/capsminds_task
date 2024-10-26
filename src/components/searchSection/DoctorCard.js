import { Typography } from '@mui/material'
import React from 'react'

const DoctorCard = ({ item }) => {
  return (
    <>
    <Typography variant="h6" color="primary" gutterBottom>
      {item.fullName}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      Specialty:
    </Typography>
    <Typography variant="body1" color="textPrimary" paragraph>
      {item.specialty}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      Location:
    </Typography>
    <Typography variant="body1" color="textPrimary" paragraph>
      {item.location}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      Expertise:
    </Typography>
    <Typography variant="body1" color="textPrimary" paragraph>
      {item.summary}
    </Typography>
  </>
  )
}

export default DoctorCard