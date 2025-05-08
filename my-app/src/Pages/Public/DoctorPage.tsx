import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { DoctorDetailsResponse } from "../../Services/Responses/DoctorDetailsResponse";
import FormDialog from "../../Components/Appointments/AppointmentDialog";
import Loading from "../../Components/common/Loading";
import { Typography } from "@mui/material";
import MapComponent from "../../Components/Map/Map";
import { LatLng } from "leaflet";

const DoctorProfile = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<DoctorDetailsResponse>("getDoctorData",`/doctors/${id}`);

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

  const doctorLocation = new LatLng(
     37.27199810417572,
     9.864544690043184
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8 space-y-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={`data:image/jpeg;base64,${data.photo}`}
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="flex-1 space-y-3">
            <h2 className="text-3xl font-bold text-gray-800">{data.username}</h2>
            <p className="text-blue-600 text-lg font-medium">{data.specialization}</p>
            <p className="text-gray-600 leading-relaxed">{data.description}</p>
            <div className="text-sm text-gray-500">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Experience</h3>
            <p className="text-gray-600">{data.yearsOfExprerience} years</p>
          </div>
          <div className="flex md:justify-end">
            <FormDialog doctorId={Number(id)} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Location</h3>
          <div className="w-full h-80 rounded-lg overflow-hidden">
            <MapComponent mode="View" location={doctorLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
