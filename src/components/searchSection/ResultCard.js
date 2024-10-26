import { Card, CardContent } from '@mui/material'
import React from 'react'
import ConditionCard from './ConditionCard'
import DoctorCard from './DoctorCard'
import { Link } from 'react-router-dom'

const ResultCard = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item.id}`} style={{ textDecoration: "none" }}>
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        {type === "conditions" ? (
          <ConditionCard item={item} />
        ) : (
          <DoctorCard item={item} />
        )}
      </CardContent>
    </Card>
  </Link>
  )
}

export default ResultCard