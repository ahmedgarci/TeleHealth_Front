export interface Message{
    content?:string;
    messageType:string;
    senderId:number;
    receiverId:number;
    media:string;
}