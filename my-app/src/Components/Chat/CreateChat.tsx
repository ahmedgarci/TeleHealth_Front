import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import useFetch from '../../Hooks/useFetch';
import { ChatPatient } from '../../Services/Requests/ChatPatientsList';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  IconButton
} from '@mui/material';
import ChatService from '../../Services/ChatService/ChatService';
import toast from 'react-hot-toast';

export default function DisplayMyPatients() {
  const {data: ChatPatients,error,isLoading} = useFetch<ChatPatient[]>("fetchMyPatients", "/chats/myPatients", false);
  const CreateNewChat = async(receiverId:number)=>{
    try {
      await ChatService.createChat(receiverId)
      toast.success("chat was screated successfully")
    } catch (error) {
        toast.error("oops error occured please try again")
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">
        Failed to load patients.
      </Typography>
    );
  }

  if (!ChatPatients || ChatPatients.length === 0) {
    return (
      <Typography textAlign="center">
        No patients found.
      </Typography>
    );
  }

  return (
    <List>
      {ChatPatients.map((patient) => (
        <ListItem key={patient.user_id} disablePadding>
          <ListItemButton onClick={() => CreateNewChat(patient.user_id)}>
            <ListItemText primary={patient.username} secondary={patient.email} />
            <IconButton edge="end">
              <PersonAddAltIcon />
            </IconButton>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
