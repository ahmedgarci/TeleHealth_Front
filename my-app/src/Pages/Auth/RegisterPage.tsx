import React, { useState } from "react";

import { RegisterPatientRequest } from "../../Services/Requests/RegisterPatientRequest";
import { RegisterDoctorRequest } from "../../Services/Requests/RegisterDoctorRequest";
import AuthService from "../../Services/Auth/AuthService";
import Loading from "../../Components/common/Loading";
import DoctorFields from "../../Components/Auth/DoctorFields";
import { Box, Container, Paper, Stack, TextField,Button } from "@mui/material";

const Register = () => {
  const [userData, setUserData] = useState<RegisterPatientRequest|RegisterDoctorRequest>({email: "",password: "",username: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role,setUserRole] = useState<string>("")
  const [errors,setErrors] = useState<[]|null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null)
    setIsLoading(true)
    try {
        if(role === "Doctor" ){
            await AuthService.RegisterDoctor(userData);
        }else{
            await AuthService.RegisterPatient(userData);
        }
    } catch (error:any) {
      setErrors(error)
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create an Account
        </Box>
        <form onSubmit={handleSubmit} className="text-start space-y-4">
          <Stack spacing={2}>
            <TextField
              variant="standard"
              label="Email"
              fullWidth
              required
               onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField
              variant="standard"
              label="Password"
              fullWidth
              required
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <TextField
            variant="standard"
            label="Full Name"
            fullWidth
            required
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            <Box >
            <input type="radio" value={"Doctor"} name="role" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUserRole(e.target.value)}/>Doctor 
            <input type="radio" name="role"onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUserRole(e.target.value)} value={"Patient"} />Patient 
            </Box>
            {role === "Doctor" && <DoctorFields state={userData as RegisterDoctorRequest} SetState={setUserData}/>}

          {errors && errors.map((element:any,index)=>{
                return <p className="text-red-500 text-start" key={index}>*{element.message}</p>})
            }
          {isLoading ? (
                    <Loading />
                ) : (
                    <Button
                    onClick={handleSubmit}
                        variant="contained"    
                    >
                      Register
                      </Button>
                )}
                      </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;