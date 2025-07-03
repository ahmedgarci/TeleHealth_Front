import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Paper } from '@mui/material';
import AppointmentService from '../../Services/AppointmentService/AppointmentService';
import { DemandAppointmentRequest } from '../../Services/Requests/DemandAppointmentRequest';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';

export default function FormDialog({ doctorId }: { doctorId: number }) {
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = React.useState<DemandAppointmentRequest>({
    doctorId: doctorId,
    appointmentDate: undefined,
    appointmentReason: undefined,
  });
  const [errors, setErrors] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = new Date(e.target.value);
    setRequest({ ...request, appointmentDate: date });
  };

  const SendDemand = async () => {
    setErrors(null);
    setLoading(true);
    try {
      await AppointmentService.createDemandForAppointment(request);
      setMessage('Your demand was sent to the doctor successfully. You will be notified soon.');
      toast.success('Appointment request sent!');
    } catch (error: any) {
      setErrors(error?.messages || ['An error occurred while sending the appointment request.']);
      toast.error('Failed to send request.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrors(null);
    setMessage(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} sx={{ padding: '10px 20px' }}>
        Book An Appointment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#f4f7fa' }}>Appointment Request</DialogTitle>
        <DialogContent>
          {message && (
            <Typography color="primary" sx={{ marginBottom: '15px' }}>
              {message}
            </Typography>
          )}
          <Typography sx={{ marginBottom: '15px' }}>
            Please provide a brief reason for your appointment and select your preferred date. This information will help our healthcare provider better understand your needs and prepare for your consultation.
          </Typography>

          <TextField
            required
            fullWidth
            margin="normal"
            id="reason"
            name="reason"
            label="Appointment Reason"
            type="text"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequest({ ...request, appointmentReason: e.target.value })}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            required
            fullWidth
            margin="normal"
            id="appointmentDateTime"
            label="Appointment Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
            sx={{ marginBottom: 2 }}
          />

          {errors &&
            errors.length > 0 &&
            errors.map((element: any, index: number) => (
              <Typography key={index} color="error" variant="body2" sx={{ marginBottom: 2 }}>
                {element.message}
              </Typography>
            ))}
        </DialogContent>

        <DialogActions sx={{ padding: '15px' }}>
          <Button onClick={handleClose} sx={{ color: 'gray' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={async () => await SendDemand()}
            size='medium'
            disabled={loading}
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            {loading ? <Loading /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
