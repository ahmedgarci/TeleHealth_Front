import React, { createContext, useState, ReactNode } from "react";
import { Message } from "../Services/Responses/Message";

type MessagesContextType = {
  messages: Message[] | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
};

export const MessagesContext = createContext<MessagesContextType | null>(null);



export const MessagesProvider = ({ children }: {children:ReactNode}) => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
