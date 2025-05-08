import { DemandAppointmentRequest } from "../Requests/DemandAppointmentRequest";
import {  privateAxios } from "../axios/Api&Interceptors"


class AppointmentService{

    async AcceptAppointment(appointmentId:number):Promise<void>{
        try{
            await privateAxios.post("/appointments/approve",{appointmentId});
        }catch(error:any){
            console.log(error);
        }
    }

    async DenyAppointment(appointmentId:number):Promise<void>{
        try{
            await privateAxios.post("/appointments/deny",{appointmentId});
        }catch(error:any){
            console.log(error);
           throw  error.response.data
        }
    }

    async createDemandForAppointment(req:DemandAppointmentRequest):Promise<void>{
        try {
            await privateAxios.post("/appointments/demand",req)   
        } catch (error:any) {
            throw error.response.data
        }
    }

    async startAppointment(appointmentId:number){
        try {
         const {data} =   await privateAxios.post("/appointments/start",{appointmentId});
         console.log(data);
         return data            
        } catch (error:any) {
            console.log(error);
            throw error.response.data
        }
    }


}

export default new AppointmentService() 