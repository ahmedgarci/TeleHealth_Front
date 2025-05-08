import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import useFetch from "../../Hooks/useFetch";
import { ChatResponse } from "../../Services/Responses/ChatsResponse";
import { MessageRequest } from "../../Services/Requests/MessageRequest";
import Loading from "../common/Loading";

export default function GetMyContacts({state,setState}:{state:MessageRequest,setState:(param:MessageRequest)=>void}) {

  const { data: Chats, isLoading, error } = useFetch<ChatResponse[]>("getContacts", "/chats",false);
  console.log(Chats);
  if(error){return <Typography color="error" width={250} >Failed to load chats</Typography>}

  return (
    <Box sx={{ width: 250, borderRight: '1px solid #ddd', height: '100vh', overflowY: 'auto', p: 2 }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Conversations
      </Typography>

      {isLoading && <Loading />}

      {(Chats && Chats.length > 0) ? (
        <List >
          {Chats.map((conv) => (
            <ListItem  key={conv.id} >
              <ListItemButton onClick={()=>setState({...state,chatId:conv.id as string,receiverId: conv.receiverId as number})} >
              <ListItemText primary={conv.name} 
              secondary={conv.lastMessage || "no messages sent"} 
              />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography> Chat is created but no messages sent </Typography>
      )}
    </Box>
  );
}
