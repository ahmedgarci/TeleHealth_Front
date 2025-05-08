import { Client } from '@stomp/stompjs';
import { MessageRequest } from '../Requests/MessageRequest';
import toast from 'react-hot-toast';
import { Notification } from './Notification';
import { MessagesContext } from '../../Hooks/useMessagesContext';

let stompClient: Client | null = null;

export default function HandleWebSocketConnection(user_id:string) {
  stompClient = new Client({
    brokerURL: "ws://localhost:8080/api/v1/ws",
    connectHeaders: {
      Authorization: localStorage.getItem("token") || "",
    },
    onConnect: () => {
      console.log("connected");
      stompClient?.subscribe(`/user/${user_id}/notification`,(message:any)=>{
        const notification:Notification = JSON.parse(message.body) 
        notification.isAccepted ? toast.success(`${notification.message}`) : toast.error(`${notification.message}`)
      }),
       stompClient?.subscribe(`/user/${user_id}/messages`,(message:any)=>{
        console.log(message);
//        MessagesContext?.setMessages(prev=> [...prev || [],message ])
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