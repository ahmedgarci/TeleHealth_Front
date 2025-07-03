import { Button, Card, CardContent, Typography, Box, IconButton, Divider } from "@mui/material";
import { AppointmentResponse } from "../../Services/Responses/AppointmentResponse";
import AppointmentService from "../../Services/AppointmentService/AppointmentService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from "react";
import Loading from "../common/Loading";

interface SingleAppointmentProps {
  appointment: AppointmentResponse;
}

export default function SingleAppointment({ appointment }: SingleAppointmentProps) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleStartMeeting = async () => {
    try {
      if (appointment.meetCode == null) {
        const meetCode = await AppointmentService.startAppointment(appointment.id);
        navigate(`/meet/${meetCode}`);
      } else {
        navigate(`/meet/${appointment.meetCode}`);
      }
    } catch (error) {
      toast.error("An error occurred while starting the consultation.");
    }
  };

  const handleAppointmentFinish = async (id: number) => {
    setLoading(true);
    try {
      await AppointmentService.markAsCompleted(id);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        {isLoading ? (
          <div style={{ float: "right" }}>
            <Loading />
          </div>
        ) : (
          <IconButton
            onClick={() => handleAppointmentFinish(appointment.id)}
            sx={{ color: "green", float: "right" }}
          >
            <CheckCircleIcon />
          </IconButton>
        )}

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {appointment.patientName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarTodayIcon sx={{ color: "#1976d2", mr: 1 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ color: "#1976d2", mr: 1 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Time:</strong> {new Date(appointment.date).toLocaleTimeString()}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Reason:</strong> {appointment.reason}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box mt={2}>
          <Button
            disabled={localStorage.getItem("role") === "ROLE_PATIENT" && appointment.meetCode === null}
            variant="outlined"
            sx={{
              backgroundColor: "#16a34a",
              '&:hover': { backgroundColor: "#15803d" },
              color: "#fff",
              fontWeight: 600,
            }}  
            fullWidth
            onClick={handleStartMeeting}
          >
            {localStorage.getItem("role") === "ROLE_DOCTOR"
              ? appointment.meetCode
                ? "Join Consultation"
                : "Start Consultation"
              : appointment.meetCode
              ? "Join Consultation"
              : "Meet not started yet"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
