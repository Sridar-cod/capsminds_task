import { Typography } from '@mui/material'
import React from 'react'

const ConditionCard = ({ item }) => {
  return (
    <>
    <Typography variant="h6" color="primary">
      {item.name}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {item.description}
    </Typography>
  </>
  )
}

export default ConditionCard