import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { DoctorDetailsResponse } from "../../Services/Responses/DoctorDetailsResponse";
import FormDialog from "../../Components/Appointments/AppointmentDialog";
import Loading from "../../Components/common/Loading";
import { Typography, Button, Paper, Card, CardContent, CardActions } from "@mui/material";
import MapComponent from "../../Components/Map/Map";
import { LatLng } from "leaflet";

const DoctorProfile = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<DoctorDetailsResponse>("getDoctorData", `/doctors/${id}`);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Typography color="error" width={250} textAlign="center">
        Oops! Failed to load doctor data.
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography color="textSecondary" width={250} textAlign="center">
        No doctor data available.
      </Typography>
    );
  }

  const doctorLocation = new LatLng(37.27199810417572, 9.864544690043184);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: "1000px",
          width: "100%",
          boxShadow: 3,
        }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={`data:image/jpeg;base64,${data.photo}`}
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
          />
          <div className="flex-1 space-y-3">
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333" }}>
              {data.username}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              {data.specialization}
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: "1.7" }}>
              {data.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
              <strong>Email:</strong> {data.email}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card sx={{ p: 3, boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Experience
              </Typography>
              <Typography sx={{ color: "#555", fontSize: "16px" }}>
                {data.yearsOfExprerience} years
              </Typography>
            </CardContent>
          </Card>
          <div className="flex justify-end items-center">
            <FormDialog doctorId={Number(id)} />
          </div>
        </div>

        <div className="mt-8">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Location
          </Typography>
          <div className="w-full h-80 rounded-lg overflow-hidden mt-3">
            <MapComponent mode="View" location={doctorLocation} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default DoctorProfile;
