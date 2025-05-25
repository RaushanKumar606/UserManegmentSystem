import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import CreateSoftware from "./pages/admin/CreateSoftware";
import RequestAccess from "./pages/user/RequestAccess";
import MyRequests from "./pages/user/MyRequests";
import PendingRequestsPage from "./pages/manager/PendingRequestsPage";
import Navbar from "./components/common/Navbar";
import SoftwareList from "./pages/admin/SoftwareList";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
     <Route path="/request-access" element={<RequestAccess />} />
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/create-software" element={<CreateSoftware />} />
            <Route path="/software" element={<SoftwareList />} />{" "}
            {/* Add this */}
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/my-requests" element={<MyRequests />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
            <Route path="/pending-requests" element={<PendingRequestsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
