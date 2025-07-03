import { useContext } from "react"
import { MessagesContext } from "./useMessagesContext"



export const useMessagesContext = ()=>{
    const context = useContext(MessagesContext)
    if(!context){
        throw new Error("context error")
    }
    return context
} 