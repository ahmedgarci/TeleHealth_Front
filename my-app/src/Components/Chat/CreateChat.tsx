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
  IconButton,
  Divider,
} from '@mui/material';
import ChatService from '../../Services/ChatService/ChatService';
import toast from 'react-hot-toast';

export default function DisplayMyPatients() {
  const { data: ChatPatients, error, isLoading } = useFetch<ChatPatient[]>("fetchMyPatients", "/chats/myPatients", false);

  const CreateNewChat = async (receiverId: number) => {
    try {
      await ChatService.createChat(receiverId);
      toast.success("Chat created successfully");
    } catch (error) {
      toast.error("Oops! An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" sx={{ p: 2 }}>
        Failed to load patients. Please try again later.
      </Typography>
    );
  }

  if (!ChatPatients || ChatPatients.length === 0) {
    return (
      <Typography textAlign="center" sx={{ p: 2 }}>
        No patients found. You can start by creating a new chat.
      </Typography>
    );
  }

  return (
    <List sx={{ bgcolor: "#fafafa" }}>
      {ChatPatients.map((patient) => (
        <Box key={patient.user_id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => CreateNewChat(patient.user_id)} sx={{ borderRadius: 1, '&:hover': { bgcolor: '#e0f7fa' } }}>
              <ListItemText
                primary={<Typography variant="h6">{patient.username}</Typography>}
                secondary={
                  <Typography variant="body2" color="textSecondary">{patient.email}</Typography>
                }
              />
              <IconButton edge="end" sx={{ color: "#00796b", '&:hover': { bgcolor: '#004d40', color: '#fff' } }}>
                <PersonAddAltIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" sx={{ my: 1 }} />
        </Box>
      ))}
    </List>
  );
}
