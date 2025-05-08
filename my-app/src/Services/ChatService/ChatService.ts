import { privateAxios } from "../axios/Api&Interceptors";

class ChatService{

    async createChat(receiver:number):Promise<void>{
        try {
           const response =await privateAxios.post(`/chats?sender_id=${localStorage.getItem("id")}&receiver_id=${receiver}`)
           console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

}
export default new ChatService();