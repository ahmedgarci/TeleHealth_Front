import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Divider,
  Alert,
  CardHeader,
  Button,
} from "@mui/material";
import useFetch from "../../Hooks/useFetch";
import { AppointmentResponse } from "../../Services/Responses/AppointmentResponse";
import DoctorService from "../../Services/AppointmentService/AppointmentService";
import { toast } from "react-hot-toast";
import Loading from "../../Components/common/Loading";

export default function AppointmentDemands() {
  const { data, isLoading, error } = useFetch<AppointmentResponse[]>(
    "fetchAllAppointments",
    "/appointments/demands",
    false
  );
  
  const handleAccept = async (id: number) => {
    try {
      await DoctorService.AcceptAppointment(id);
    } catch {
      toast.error("Failed to accept appointment.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await DoctorService.DenyAppointment(id);
    } catch(error:any) {
      toast.error("Failed to reject appointment.");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Loading />
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
      <Typography variant="h4" gutterBottom sx={{ textAlign: "start", mb: 2 }}>
       Appointment Requests
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 2 }}>
        <Stack spacing={3}>
          {data?.length ? (
            data.map((item) => (
              <Card
                key={item.id}
                elevation={2}
                sx={{ borderRadius: 2, backgroundColor: "#fefefe" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      {item.patientName?.charAt(0)}
                    </Avatar>
                  }
                  title={item.patientName}
                  subheader={new Date(item.date).toLocaleString()}
                />
                <Divider />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Reason for Visit:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.reason || "No reason provided"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Scheduled on {new Date(item.date).toLocaleDateString()} at{" "}
                    {new Date(item.date).toLocaleTimeString()}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(item.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No appointment requests for today.
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  );
}
