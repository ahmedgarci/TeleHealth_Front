import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  ListItemAvatar,
  Divider,
  Badge,
} from "@mui/material";
import useFetch from "../../Hooks/useFetch";
import { ChatResponse } from "../../Services/Responses/ChatsResponse";
import { MessageRequest } from "../../Services/Requests/MessageRequest";
import Loading from "../common/Loading";

interface GetMyContactsProps {
  state: MessageRequest;
  setState: (param: MessageRequest) => void;
}

export default function GetMyContacts({ state, setState }: GetMyContactsProps) {
  const { data: chats, isLoading, error } = useFetch<ChatResponse[]>(
    "getContacts",
    "/chats",
    false
  );

  const handleSelectChat = (chat: ChatResponse) => {
    setState({
      ...state,
      chatId: chat.id as string,
      receiverId: chat.receiverId as number,
    });
  };

  if (error) {
    return (
      <Typography color="error" sx={{ width: 250, p: 2 }}>
        Unable to load conversations.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: 300,
        borderRight: "1px solid #e0e0e0",
        height: "100vh",
        overflowY: "auto",
        p: 2,
        bgcolor: "#fafafa",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "#4CAF50" }}>
        Active Chats
      </Typography>

      {isLoading && <Loading />}

      {chats && chats.length > 0 ? (
        <List dense>
          {chats.map((chat, idx) => (
            <Box key={chat.id}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelectChat(chat)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#4CAF50" }}>
                      {chat?.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold" sx={{ color: "#333" }}>
                        {chat.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#757575" }}>
                        {chat.lastMessage || "No messages yet"}
                      </Typography>
                    }
                  />
               
                </ListItemButton>
              </ListItem>
              {idx < chats.length - 1 && <Divider sx={{ marginY: 1 }} />}
            </Box>
          ))}
        </List>
      ) : (
        !isLoading && (
          <Typography variant="body2" align="center" color="textSecondary">
            No active conversations found.
          </Typography>
        )
      )}
    </Box>
  );
}
