import { Box, Typography } from "@mui/material";
import useFetch from "../../Hooks/useFetch";
import { Message } from "../../Services/Responses/Message";
import Loading from "../common/Loading";
import { useMessagesContext } from "../../Hooks/UseMessagesHOC";
import { useEffect } from "react";

interface DisplayChatMessagesProps {
  ChatId: string;
}

export default function DisplayChatMessages({ ChatId }: DisplayChatMessagesProps) {
  const { data: fetchedMessages, isLoading, error } = useFetch<Message[]>(
    "loadMessages",
    `/messages/chat/${ChatId}`,
    false
  );

  const { messages, setMessages } = useMessagesContext();
  const connectedUserId: number = Number(localStorage.getItem("id"));

  useEffect(() => {
    if (fetchedMessages && fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages, setMessages]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Typography color="error" width={250} textAlign="center">
        oops ! Failed to load messages
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflowY: "auto",
        bgcolor: "#f5f5f5",
        height: "100%",
      }}
    >
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              textAlign: msg.senderId === connectedUserId ? "right" : "left",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 2,
                bgcolor:
                  msg.receiverId === connectedUserId ? "#e0e0e0" : "#1976d2",
                color:
                  msg.receiverId === connectedUserId ? "black" : "white",
              }}
            >
              {msg.content}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="h5">No messages sent</Typography>
      )}
    </Box>
  );
}
