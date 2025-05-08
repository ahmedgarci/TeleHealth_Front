import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            TeleHealth+
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Your Health, Anywhere, Anytime
          </Typography>
          <Typography variant="h6" >
            Connect with certified doctors in minutes. No waiting rooms, no hassle.
          </Typography>
          <Button
    component={NavLink}
      to="/doctors"
    variant="contained"
    sx={{
      backgroundColor: '#ffffff',
      color: '#1976d2',
      border: '1px solid #1976d2'
    }}
  >
    Book Now
  </Button>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "24/7 Access",
              description: "Talk to a doctor anytime, day or night.",
            },
            {
              title: "Prescriptions Online",
              description: "Get prescriptions delivered straight to your door.",
            },
            {
              title: "Secure & Private",
              description: "Your data is protected with end-to-end encryption.",
            },
          ].map((feature, index) => (
            <Grid item size={4} key={index}>
              <Paper elevation={3} sx={{ p: 3 ,height:"150px"}}>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "grey.100", p: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} TeleHealth+. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
