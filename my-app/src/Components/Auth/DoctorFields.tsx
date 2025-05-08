import { RegisterDoctorRequest } from "../../Services/Requests/RegisterDoctorRequest";
import { Box, Input, TextField } from "@mui/material";

type StateAsProp = {
    state:RegisterDoctorRequest
    SetState:(e:any)=>void
}

export default function DoctorFields({SetState,state}:StateAsProp){
    return(
        <>
            <Box>
            <TextField
              label={"Speciality"}
              required
              fullWidth
              variant="standard"
              onChange={(e) => SetState({ ...state, specialization: e.target.value })}
            />
            <Input
            type="number"
            inputProps={{ min: 0 }} 
          
/>
          </Box>        
        
        </>
    )
}