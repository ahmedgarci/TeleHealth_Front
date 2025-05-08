import {Box,Typography,Stack,Card,CardContent,Avatar,Divider,CircularProgress,Alert,CardHeader,Button} from "@mui/material";
  import useFetch from "../../Hooks/useFetch";
  import { AppointmentResponse } from "../../Services/Responses/AppointmentResponse";
import DoctorService from "../../Services/AppointmentService/AppointmentService";
  
export default function AppointmentDemands() {
    const { data, isLoading, error } = useFetch<AppointmentResponse[]>("fetchAllAppointments", "/appointments/today",false);

    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }
  
    return (
        <>
        <Typography variant="h4" gutterBottom sx={{textAlign:"start"}}>
          All Appointment Demands
        </Typography>
      <Box sx={{ width: "100%", maxWidth: 800, mx:"auto", p: 2 }}>
        <Stack spacing={3}>
          {data?.length ? (
            data.map((item, index) => (
              <Card
                key={index}
                elevation={3}
                sx={{
                  borderRadius: 3,
                  p: 1,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: "#1976d2" }}></Avatar>}
                  title={item.patientName}
                  subheader={new Date(item.date).toLocaleString()}
                />
                <Divider />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="body1" color="text.primary">
                      {item.reason}
                    </Typography>
                  </Box>
  
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Scheduled on: {new Date(item.date).toLocaleDateString()} at{" "}
                      {new Date(item.date).toLocaleTimeString()}
                    </Typography>
                  </Box>
  
                   <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button variant="contained" color="success" onClick={async()=>await DoctorService.AcceptAppointment(item.id)}>Accept</Button>
                    <Button variant="outlined" color="error"onClick={async()=>await DoctorService.DenyAppointment(item.id)}>Reject</Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No appointment demands found.</Typography>
          )}
        </Stack>
      </Box>
      </>

    );
  }
  