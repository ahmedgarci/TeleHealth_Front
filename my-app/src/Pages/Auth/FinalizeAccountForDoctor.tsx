import React, { useState } from "react";
import MapComponent from "../../Components/Map/Map";
import AuthService from "../../Services/Auth/AuthService";
import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import { LatLng } from "leaflet";

const DoctorFinalizeAccountPage = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [place, setPlace] = useState<LatLng | null>(null);
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<[] | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !place) {
      return;
    }
    const formData = new FormData();
    formData.append("file", photo);
    formData.append(
      "request",
      new Blob(
        [JSON.stringify({ description, lat: place?.lat, lngt: place?.lng })],
        { type: "application/json" }
      )
    );

    try {
      await AuthService.finalizeAccount(formData);
    } catch (error: any) {
      setErrors(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          maxWidth: 1000,
          width: "100%",
          p: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Complete Your Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Upload your profile photo and complete your doctor profile to get started.
          </Typography>

          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={photo ? URL.createObjectURL(photo) : "path/to/placeholder-image.png"}
              sx={{
                width: 128,
                height: 128,
                border: "3px solid #ccc",
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </IconButton>
          </Box>
          <TextField
            variant="standard"
            label="Description"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 4 }}
          />
          {errors &&
            errors.map((err, idx) => (
              <Typography color="error" variant="body2" key={idx}>
                {err}
              </Typography>
            ))}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <MapComponent state={place!} setSate={setPlace} mode="Select" />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-end", mt: 3 }}
          >
            Finalize Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DoctorFinalizeAccountPage;
