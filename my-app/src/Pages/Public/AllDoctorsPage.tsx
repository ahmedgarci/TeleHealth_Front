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
import { NavLink } from "react-router-dom";

const DoctorsPage = () => {
  const {data:doctors,error,isLoading} = useFetch<DoctorDetailsResponse[]>("fetchAllDoctors","/doctors/all")

  if(isLoading){
    return <Loading />
  }

  if(error){
    return <Typography color="error" width={250} textAlign="center" >oops ! Failed to load messages </Typography>
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Meet Our Doctors
      </Typography>

      <Grid container spacing={4}>
        {doctors && doctors.map((doctor) => (
          <Grid item key={doctor.id} size={3}>
            <NavLink to={`/doctor/${doctor.id}`}>
            <Card component={Paper} elevation={3} sx={{ textAlign: "center", p: 2 }}>
              <Avatar
                alt={doctor.username}
                src={`data:image/jpeg;base64,${doctor.photo}`}
                sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
              />
              <CardContent>
                <Typography variant="h6">{doctor.username}</Typography>
                <Typography color="text.secondary">{doctor.specialization}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" variant="outlined" color="primary">
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
