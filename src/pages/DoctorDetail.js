import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import { getDoctorDetail } from '../services/api';

function DoctorDetail() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDoctorDetail(id);
            setDoctor(result);
        };
        fetchData();
    }, [id]);

    return doctor && (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
        >
            <Card sx={{ maxWidth: 600, p: 2, boxShadow: 4, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" color="primary" gutterBottom>
                        {doctor.fullName}
                    </Typography>

                    <Typography variant="subtitle1" color="primary">Specialty:</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        {doctor.specialty}
                    </Typography>

                    <Typography variant="subtitle1" color="primary">Location:</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        {doctor.location}
                    </Typography>

                    <Typography variant="subtitle1" color="primary">Availability:</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        {doctor.availability}
                    </Typography>

                    <Box mt={3} display="flex" justifyContent="center">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            href={`/doctors/${id}/schedule`} 
                            sx={{ mt: 2 }}
                        >
                            Schedule Appointment
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default DoctorDetail;
