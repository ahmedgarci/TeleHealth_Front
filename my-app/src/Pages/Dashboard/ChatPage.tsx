import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Stack,
  Divider,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ForumIcon from "@mui/icons-material/Forum";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { PublishMessage } from '../../Services/Websocket/WebsocketService';
import GetMyContacts from '../../Components/Chat/MyConversations';
import DisplayChatMessages from '../../Components/Chat/ChatMessages';
import { MessageRequest } from '../../Services/Requests/MessageRequest';
import ChatHeader from '../../Components/Chat/ChatHeader';
import DisplayMyPatients from '../../Components/Chat/CreateChat';

const ChatPage = () => {
  const userId = Number(localStorage.getItem("id"));

  const [message, setMessage] = useState<MessageRequest>({
    content: "",
    chatId: "",
    senderId: userId,
    receiverId: 0,
    messageType: "TEXT"
  });

  const [view, setView] = useState<"chats" | "patients">("chats");
  const handleSendMessage = () => {
    PublishMessage(message);
    setMessage(prev => ({ ...prev, content: "" }));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ width: 300, borderRight: '1px solid #ddd', p: 2 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <IconButton onClick={() => setView("chats")} title="My Conversations">
            <ForumIcon color={view === "chats" ? "primary" : "inherit"} />
          </IconButton>
          <IconButton onClick={() => setView("patients")} title="New Chat">
            <PersonAddAltIcon color={view === "patients" ? "primary" : "inherit"} />
          </IconButton>
        </Stack>
        <Divider />
        {view === "chats" && (
          <GetMyContacts state={message} setState={setMessage} />
        )}
        {view === "patients" && <DisplayMyPatients />}
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {message.chatId ? (
          <>
            <ChatHeader /> 
            <Divider />
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              <DisplayChatMessages ChatId={message.chatId} />
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', p: 2 }}>
              <TextField
                value={message.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage({ ...message, content: e.target.value })
                }
                variant="outlined"
                placeholder="Écrire un message..."
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                color="primary"
                sx={{ ml: 1 }}
                onClick={handleSendMessage}
                disabled={!message.content.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Sélectionnez une conversation pour commencer à discuter
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
