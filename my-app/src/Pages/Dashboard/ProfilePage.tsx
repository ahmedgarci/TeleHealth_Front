import { LatLng } from "leaflet";
import useFetch from "../../Hooks/useFetch";
import MapComponent from "../../Components/Map/Map";
import { ProfileResponse } from "../../Services/Responses/ProfileResponse";
import Loading from "../../Components/common/Loading";
import { Alert, Box } from "@mui/material";

export default function ProfilePage() {
  const {data:doctor,isLoading,error} = useFetch<ProfileResponse>("profileData", "/profile/me",false);
  console.log(doctor);
  if(isLoading){
    return <Loading />
  }
  if(error){
    return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Alert severity="error">{error.message}</Alert>
    </Box>
    )
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col md:flex-row gap-8">
        <img
          src={`data:image/png;base64,${doctor?.photo ?? "iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAAAA"}`}
          alt="Doctor Photo"
          className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-blue-300"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">Dr. {doctor?.username ?? "Unknown"}</h2>
          <p className="text-blue-600 font-semibold">
            Specialization: {doctor?.specialization ?? "N/A"}
          </p>
          <p className="text-gray-600 italic">
            {doctor?.description ?? '"No description provided"'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold">📧 Email:</span>
              <p>{doctor?.email ?? "Not Available"}</p>
            </div>
            <div>
              <span className="font-semibold">🧠 Experience:</span>
              <p>{doctor?.yearsOfExprerience ?? 0} years</p>
            </div>
            <div className="col-span-2">
              <span className="font-semibold block mb-2">📍 Location:</span>
              <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
              </div>
            </div>
            <div>
              <span className="font-semibold">🆔 Doctor ID:</span>
              <p>#{doctor?.id ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      <MapComponent mode="View" location={new LatLng(doctor?.longtitude as number,doctor?.altitude as number)}  />

    </div>
  );
}
