import React, { createContext, useState, ReactNode } from "react";
import { Message } from "../Services/Responses/Message";

type MessagesContextType = {
  messages: Message[] | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
};

export const MessagesContext = createContext<MessagesContextType | null>(null);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
