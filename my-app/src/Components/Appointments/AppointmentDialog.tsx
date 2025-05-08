import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppointmentService from '../../Services/AppointmentService/AppointmentService';
import { DemandAppointmentRequest } from '../../Services/Requests/DemandAppointmentRequest';
import { Typography } from '@mui/material';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';
export default function FormDialog({doctorId}:{doctorId:number}) {

    const [open, setOpen] = React.useState(false);
    const [request,setRequest] = React.useState<DemandAppointmentRequest>({doctorId:doctorId,appointmentDate:undefined,appointmentReason:undefined})
    const [errors,setErrors]=React.useState<any>()
    const [loading,setLoading]= React.useState<boolean>(false)
    const [message,setMessage] = React.useState<string|null>(null)

  function handleDateChange(e:React.ChangeEvent<HTMLInputElement>){
    let date = new Date(e.target.value);
    setRequest({...request,appointmentDate:date})
  }

  async function SendDemand(){
    setErrors(null)
    setLoading(true)
    try {
      await  AppointmentService.createDemandForAppointment(request)
    } catch (error:any) {
        setErrors(error);
    }finally{
        setLoading(false)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrors(null)
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book An Appointment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
            },
          },
        }}
      >
        <DialogTitle>Appointment Demand</DialogTitle>
        {message && <Typography>Your demand was sent to the doctor successfully . u will be notified </Typography>}
        <DialogContent>
          <DialogContentText>
          Please provide a brief reason for your appointment and select your preferred date. This information will help our healthcare provider better understand your needs and prepare for your consultation.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reason"
            name="reason"
            label="Appointment Reason"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRequest({...request,appointmentReason:e.target.value})}
          />    

    <div className="flex flex-col space-y-2 max-w-xs">
      <label htmlFor="appointmentDate" className="text-sm font-medium text-gray-700">
        Appointment Date
      </label>
      <input
        id="appointmentDateTime"
        type="datetime-local"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleDateChange}
      />
    </div>
        {errors && errors.length > 0 && errors.map((element)=>{
            return(
                <Typography color="error" variant="body2">
                            {element.message}
                        </Typography>
            )
        })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={async()=>await SendDemand()} disabled={loading}>{loading ? <Loading /> : "Submit"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
