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
  Alert,
  Divider,
} from "@mui/material";
import Loading from "../../Components/common/Loading";
import { AuthenticateRequest } from "../../Services/Requests/AuthenticateRequest";
import { AuthResponse } from "../../Services/Responses/AuthResponse";
import AuthService from "../../Services/Auth/AuthService";

function Auth() {
  const [user, setUser] = useState<AuthenticateRequest>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await AuthService.Authenticate(user);
      localStorage.setItem("token", `${response.jwt}`);
      localStorage.setItem("id", `${response.user_id}`);
      localStorage.setItem("role", `${response.role}`);
      navigate("/appointments");
    } catch (err: any) {
      setError(err?.messages || ["Login failed. Please check your credentials."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10, borderRadius: 3 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Welcome to <span style={{ color: "#16a34a", fontWeight: 600 }}>Docnet</span>
        </Typography>

        <Typography variant="subtitle2" align="center" gutterBottom color="text.secondary">
          Sign in to continue
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} mt={3}>
            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            {error &&
              error.map((msg, idx) => (
                <Alert severity="error" key={idx}>
                  {msg}
                </Alert>
              ))}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#16a34a",
                '&:hover': { backgroundColor: "#15803d" },
                color: "#fff",
                fontWeight: 600,
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loading size={24} /> : "Sign In"}
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            borderColor: "#16a34a",
            color: "#16a34a",
            fontWeight: 600,
            '&:hover': {
              backgroundColor: "#f0fdf4",
              borderColor: "#15803d",
            },
          }}
        >
          Create an account
        </Button>
      </Paper>
    </Container>
  );
}

export { Auth };
