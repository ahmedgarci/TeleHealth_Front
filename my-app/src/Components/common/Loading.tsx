import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
   
export default function Loading() {
      return (
        <Box sx={{ display: 'flex', justifyItems:"center", justifyContent:"center",  height:"100%", mt:"10px" }}>
          <CircularProgress />
        </Box>
      );
    }
    
