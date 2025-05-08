import { Client } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { Notification } from '../Services/Websocket/Notification';
import { useContext, useEffect, useRef } from 'react';
import { MessagesContext } from './useMessagesContext';

export default function useWebsocketConnectionInit(user_id: string) {
  const context = useContext(MessagesContext);
  var stompClientRef = useRef<Client | null>(null)

  useEffect(() => {
    if ( !user_id) return;


    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/api/v1/ws",
      connectHeaders: {
        Authorization: localStorage.getItem("token") || "",
      },
      onConnect: () => {
        console.log("connected");
        stompClient.subscribe(`/user/${user_id}/notification`, (message: any) => {
          const notification: Notification = JSON.parse(message.body);
          notification.isAccepted
            ? toast.success(notification.message)
            : toast.error(notification.message);
        });

        stompClient.subscribe(`/user/${user_id}/messages`, (message: any) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          context?.setMessages(prev => [...(prev || []), newMessage]);
        });
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [user_id, context]);

}

function sendMessage(){
  if(stom)
}