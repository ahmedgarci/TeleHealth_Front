import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import useFetch from "../../Hooks/useFetch";
import { DoctorDetailsResponse } from "../../Services/Responses/DoctorDetailsResponse";
import Loading from "../../Components/common/Loading";
import { NavLink, data } from "react-router-dom";

const DoctorsPage = () => {
  const { data: doctors, error, isLoading } = useFetch<DoctorDetailsResponse[]>("fetchAllDoctors", "/doctors/all");
  console.log(doctors);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error" width={250} textAlign="center">Oops! Failed to load doctors.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: '#333' }}>
        Meet Our Doctors
      </Typography>

      <Grid container spacing={4}>
        {doctors && doctors.map((doctor) => (
          <Grid item key={doctor.id} xs={12} sm={6} md={4} lg={3} size={4}>
            <NavLink to={`/doctor/${doctor.id}`} style={{ textDecoration: 'none' }}>
              <Card
                component={Paper}
                elevation={3}
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: '0.3s' }
                }}
              >
                <Avatar
                  alt={doctor.username}
                  src={`data:image/jpeg;base64,${doctor.photo}`}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    border: '3px solid #16a34a',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{doctor.username}</Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {doctor.specialization}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{
                      backgroundColor: '#16a34a',
                      color: 'white',
                      '&:hover': { backgroundColor: '#15803d' },
                    }}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorsPage;
