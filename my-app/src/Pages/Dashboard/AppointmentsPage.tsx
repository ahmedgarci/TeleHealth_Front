import { Grid, Typography, Paper, Box } from '@mui/material';
import useFetch from '../../Hooks/useFetch';
import { AppointmentResponse } from '../../Services/Responses/AppointmentResponse';
import SingleAppointment from '../../Components/Appointments/SingleAppointment';
import Loading from '../../Components/common/Loading';


const AppointmentsPage = () => {
  const  {data:allAppointments,error,isLoading} =useFetch<AppointmentResponse[]>("fetchAppointments","/appointments/today",false)

  if(isLoading){
    return <Loading />
  }

  return (
    <Box sx={{ width: '100%', padding: '24px' }}>
      <Typography variant="h4" gutterBottom textAlign={"start"} >
        Today's Appointments
      </Typography>

      <Grid container spacing={ 2}>
        {allAppointments ?  allAppointments.map((appointment,index) => (
          <Grid size={6} key={index}>
            <Paper elevation={3}>
             <SingleAppointment appointment={appointment}/>
            </Paper>
          </Grid>
        )):
        <p>No appointments are scheduled for today.</p>

      }
      </Grid>
    </Box>
  );
};


export default AppointmentsPage;
