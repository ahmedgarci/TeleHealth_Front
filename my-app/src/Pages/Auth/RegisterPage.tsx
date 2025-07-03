import React, { useState } from "react";
import { RegisterPatientRequest } from "../../Services/Requests/RegisterPatientRequest";
import { RegisterDoctorRequest } from "../../Services/Requests/RegisterDoctorRequest";
import AuthService from "../../Services/Auth/AuthService";
import Loading from "../../Components/common/Loading";
import DoctorFields from "../../Components/Auth/DoctorFields";
import { Box, Container, Paper, Stack, TextField, Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState<RegisterPatientRequest | RegisterDoctorRequest>({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setUserRole] = useState<string>("");
  const [errors, setErrors] = useState<[] | null>(null);
  const naviagate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);
    try {
      if (role === "Doctor") {
        await AuthService.RegisterDoctor(userData);
      } else {
        await AuthService.RegisterPatient(userData);
      }
      naviagate("/auth")
    } catch (error: any) {
      setErrors([error]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create an Account
        </Box>
        <form onSubmit={handleSubmit} className="text-start space-y-4">
          <Stack spacing={2}>
            {/* Champ Email */}
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              required
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              sx={{ bgcolor: 'white' }}
            />
            {/* Champ Password */}
            <TextField
              variant="outlined"
              label="Password"
              fullWidth
              required
              type="password"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              sx={{ bgcolor: 'white' }}
            />
            {/* Champ Nom complet */}
            <TextField
              variant="outlined"
              label="Full Name"
              fullWidth
              required
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              sx={{ bgcolor: 'white' }}
            />

            {/* Sélection du rôle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
              <Box>
                <input
                  type="radio"
                  value="Doctor"
                  name="role"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRole(e.target.value)}
                />
                Doctor
              </Box>
              <Box>
                <input
                  type="radio"
                  value="Patient"
                  name="role"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRole(e.target.value)}
                />
                Patient
              </Box>
            </Box>

            {/* Affichage des champs spécifiques au médecin */}
            {role === "Doctor" && <DoctorFields state={userData as RegisterDoctorRequest} SetState={setUserData} />}

            {/* Affichage des erreurs */}
            {errors && errors.map((element: any, index: number) => (
              <Typography key={index} variant="body2" color="error" sx={{ textAlign: 'center' }}>
                *{element.message}
              </Typography>
            ))}

            {/* Bouton de soumission */}
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#4caf50', // Vert clair pour un effet apaisant
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#388e3c', // Vert plus foncé au survol
                  },
                  padding: '12px',
                  fontWeight: 'bold',
                }}
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
