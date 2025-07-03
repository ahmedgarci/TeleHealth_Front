import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/common/Sidebar";
import { Auth } from "./Pages/Auth/AuthPage";
import Register from "./Pages/Auth/RegisterPage";
import DoctorProfilePage from "./Pages/Auth/FinalizeAccountForDoctor";
import ProfilePage from "./Pages/Dashboard/ProfilePage";
import DoctorProfile from "./Pages/Public/DoctorPage";
import AppointmentDemands from "./Pages/Dashboard/DemandsPage";
import { useContext, useEffect } from "react";
import HandleWebSocketConnection from "./Services/Websocket/WebsocketService";
import AppointmentsPage from "./Pages/Dashboard/AppointmentsPage";
import ChatPage from "./Pages/Dashboard/ChatPage";
import HomePage from "./Pages/Public/HomePage";
import DoctorsPage from "./Pages/Public/AllDoctorsPage";
import { Toaster } from 'react-hot-toast'; 
import { MessagesProvider } from "./Hooks/useMessagesContext";
import VideCallPage from "./Pages/Dashboard/MeetPage";
import { useMessagesContext } from "./Hooks/UseMessagesHOC";


function App() {
  const user_id:string|null = localStorage.getItem("id")
  const context = useMessagesContext()
  useEffect(()=>{
    if(!user_id){return;}
    HandleWebSocketConnection(user_id,context.setMessages)
  },[user_id])
  return (
    <MessagesProvider>
    <Router>
      <Routes>
        <Route path="/meet/:meetCode" element={<VideCallPage/>}  />
        <Route path="/" element={<Sidebar />}>
          <Route path="appointments" element={<AppointmentsPage/>} />
          <Route path="demands" element={<AppointmentDemands/>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="messages" element={<ChatPage/>} />
        </Route>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/finalize" element={<DoctorProfilePage />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/doctors" element={<DoctorsPage />} />
      </Routes>
      <Toaster position="bottom-right"/>
    </Router>
    </MessagesProvider>

  );
}

export default App;
