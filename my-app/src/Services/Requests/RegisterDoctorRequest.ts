import { RegisterPatientRequest } from "./RegisterPatientRequest";

export type RegisterDoctorRequest = RegisterPatientRequest & {
    specialization:string,
    yearsOfExperience:number
}