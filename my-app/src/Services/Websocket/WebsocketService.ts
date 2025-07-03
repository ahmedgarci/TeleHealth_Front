import { Client } from '@stomp/stompjs';
import { MessageRequest } from '../Requests/MessageRequest';
import toast from 'react-hot-toast';
import { Notification } from './Notification';
import React from 'react';
import { Message } from '../Responses/Message';

let stompClient: Client | null = null;

export default function HandleWebSocketConnection(user_id:string,setMessages:React.Dispatch<React.SetStateAction<Message[] | null >>) {
  stompClient = new Client({
    brokerURL: "ws://localhost:8080/api/v1/ws",
    connectHeaders: {
      Authorization: localStorage.getItem("token") as string,
    },
    onConnect: () => {
      stompClient?.subscribe(`/user/${user_id}/notification`,(message:any)=>{
        const notification:Notification = JSON.parse(message.body) 
        console.log(notification);
        notification?.accepted ? toast.success(`${notification.message}`) : toast.error(`${notification.message}`)
      }),
       stompClient?.subscribe(`/user/${user_id}/messages`,(message:any)=>{
        console.log(message);
        setMessages((prev) => [...prev||[],message])
      })
    },

    onStompError: (frame) => {
      console.error("❌ STOMP Error:", frame.headers["message"]);
    },
  });

    stompClient.activate();

  }

export const PublishMessage = (message:MessageRequest)=>{
  stompClient?.publish({
    destination:"/app/send",
    body:JSON.stringify(message)
  })
}