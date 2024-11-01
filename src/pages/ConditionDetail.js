import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { getConditionDetail } from "../services/api";

function ConditionDetail() {
  const { id } = useParams();

  const [condition, setCondition] = useState(null);
                              
  useEffect(() => {
    const fetchData = async () => {
      const result = await getConditionDetail(id);
      setCondition(result);
    };
    fetchData();
  }, [id]);

  return (
    condition && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Card sx={{ maxWidth: 600, p: 2, boxShadow: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              {condition?.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {condition?.fullDescription}
            </Typography>

            <Typography variant="subtitle1" color="primary">
              Symptoms:
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {condition.symptoms.join(", ")}
            </Typography>

            <Typography variant="subtitle1" color="primary">
              Causes:
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {condition.causes.join(", ")}
            </Typography>

            <Typography variant="subtitle1" color="primary">
              Treatments:
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {condition.treatments.join(", ")}
            </Typography>

            <Box mt={3}>
              <Link to="/dashboard" style={{ textDecoration: "none", color: "#1976d2" }}>
                Back to search
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  );
}

export default ConditionDetail;
