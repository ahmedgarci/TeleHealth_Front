import { api, privateAxios } from "../axios/Api&Interceptors";
import { AuthenticateRequest } from "../Requests/AuthenticateRequest";
import { RegisterPatientRequest } from "../Requests/RegisterPatientRequest";
import { AuthResponse } from "../Responses/AuthResponse";

class AuthService{

    async Authenticate(req:AuthenticateRequest):Promise<AuthResponse>{
        try {
           const {data} =await api.post("/auth/authenticate",req);
           return {
                user_id:data.user_id,
                jwt:data.jwt,
                role:data.role,
                username:data.username
           }                
        } catch (error:any) {
            throw error.response.data
        }
    }

    async RegisterPatient(req:RegisterPatientRequest):Promise<void>{
        try {
           await api.post("auth/register/patient",req)      
        } catch (error:any) {
            throw error.response.data
        }
    }

    async RegisterDoctor(req:AuthenticateRequest):Promise<void>{
        try {
           await api.post("auth/register/doctor",req);
        } catch (error:any) {
            throw error.response.data
        }
    }

    async finalizeAccount(form:FormData):Promise<void>{
        try {
          await privateAxios.post("auth/finalize",form);
        } catch (error:any) {
            throw error.response.data
        }
    }

    async Logout():Promise<void>{
        try {
           await privateAxios.post("/logout") 
           localStorage.clear()
           window.location.href = "/auth"
        } catch (error:any) {
            throw error.response.data;
        }
    }



}
export default new AuthService();