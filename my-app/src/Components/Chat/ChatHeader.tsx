import { Paper, Typography } from "@mui/material";

export default function ChatHeader(){
    return(
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6">Messages</Typography>
          
        </Paper>
    )
}