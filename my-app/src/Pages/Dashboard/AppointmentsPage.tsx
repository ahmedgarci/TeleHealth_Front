import { Grid, Typography, Paper, Box, Alert, CircularProgress } from '@mui/material';
import useFetch from '../../Hooks/useFetch';
import { AppointmentResponse } from '../../Services/Responses/AppointmentResponse';
import SingleAppointment from '../../Components/Appointments/SingleAppointment';
import Loading from '../../Components/common/Loading';

const AppointmentsPage = () => {
  const { data: allAppointments, error, isLoading } = useFetch<AppointmentResponse[]>("fetchAppointments", "/appointments", false);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginBottom: '20px' }}>
        Oops! Something went wrong while fetching your appointments.
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: '24px' }}>
      <Typography variant="h4" gutterBottom textAlign="start" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
        Today's Appointments
      </Typography>

      {allAppointments && allAppointments.length === 0 ? (
        <Alert severity="info" sx={{ marginBottom: '20px' }}>
          No appointments are scheduled for today.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {allAppointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <SingleAppointment appointment={appointment} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AppointmentsPage;
