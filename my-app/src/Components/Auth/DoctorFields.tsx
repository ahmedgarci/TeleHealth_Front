import { RegisterDoctorRequest } from "../../Services/Requests/RegisterDoctorRequest";
import { Box, TextField, InputAdornment, InputLabel, FormControl, Select, MenuItem, Input } from "@mui/material";

type StateAsProp = {
  state: RegisterDoctorRequest;
  SetState: (e: any) => void;
};

export default function DoctorFields({ SetState, state }: StateAsProp) {
  return (
    <Box>
      <TextField
        label="Specialization"
        required
        fullWidth
        variant="outlined"
        value={state.specialization || ""}
        onChange={(e) => SetState({ ...state, specialization: e.target.value })}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Years of Experience"
        required
        fullWidth
        type="number"
        value={state.yearsOfExperience || ""}
        onChange={(e) => SetState({ ...state, yearsOfExperience: e.target.value })}
        InputProps={{
          startAdornment: <InputAdornment position="start">Years</InputAdornment>,
        }}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
}
