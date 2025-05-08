import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import Loading from "../../Components/common/Loading";
import { AuthenticateRequest } from "../../Services/Requests/AuthenticateRequest";
import { AuthResponse } from "../../Services/Responses/AuthResponse";
import AuthService from "../../Services/Auth/AuthService";

function Auth() {
    const [user, setUser] = useState<AuthenticateRequest>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<[] | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response: AuthResponse = await AuthService.Authenticate(user);
            console.log(response);
            localStorage.setItem("token",`${response.jwt}`)
            localStorage.setItem("id",`${response.user_id}`)
            localStorage.setItem("role",`${response.role}`)
            navigate("/appointments");
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }} className="rounded">
                <Typography variant="h5" component="h1" gutterBottom>
                    Log in
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            variant="standard"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <TextField
                             variant="standard"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        
                        {error && error.map((err)=>{
                            return( <Typography color="error" variant="body2">
                            {err}
                        </Typography>)
                        }) 
                        }
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? <Loading size={24} /> : "Sign in"}
                        </Button>
                    </Stack>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    New to Docnet?{' '}
                    <Link href="/register">
                        Register!
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export { Auth };
