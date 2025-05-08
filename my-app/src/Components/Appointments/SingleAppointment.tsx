import { Button, Card, CardContent, Typography } from "@mui/material";
import { AppointmentResponse } from "../../Services/Responses/AppointmentResponse";
import AppointmentService from "../../Services/AppointmentService/AppointmentService";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

export default function SingleAppointment({ appointment }: { appointment: AppointmentResponse }) {
  const navigate = useNavigate();
  console.log(appointment);
  async function startMeeting(){
    try {
      const meetCode = await AppointmentService.startAppointment(appointment.id);
      navigate(`/meet/${meetCode}`)
    } catch (error:any) {
      console.log(error);
        toast.error("error occured while joining the meet")
    }

  }


  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {appointment.patientName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Date: {new Date(appointment.date).toLocaleDateString()} - {new Date(appointment.date).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Reason: {appointment.reason}
        </Typography>
        {appointment.meetCode ? (
          <Button color="primary" onClick={()=>startMeeting}>
            Join Meeting
          </Button>
        ) : (
        
            <Button color="primary" onClick={startMeeting}>
              Start Meeting
            </Button>
         
        )}
      </CardContent>
    </Card>
  );
}
