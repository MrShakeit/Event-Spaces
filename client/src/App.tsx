import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/signin.tsx";
import SignUpPage from "./pages/auth/signup.tsx";
import HomePage from "./components/homepage/homepage-form.tsx";
import { AuthContextProvider } from "./context/auth-context.tsx";
import Navbar from "./components/navbar/navbar.tsx";
import AdminHomePage from "./components/admin/adminHomePage.tsx";
import RoutePolicy from "./components/auth/route-policy.tsx";
import AdminUsersPage from "./components/admin/user/adminUsersPage.tsx";
import AdminSpacesPage from "./components/admin/space/SpacesPage.tsx";
import AdminBookingsPage from "./components/admin/booking/adminBookingsPage.tsx";
import AdminUserDetailsPage from "./components/admin/user/adminUserDetails.tsx";
import AdminSpaceDetailsPage from "./components/admin/space/SpaceDetails.tsx";
import { UpdateSpace } from "./components/admin/space/UpdateSpace.tsx";
import { CreateSpacePage } from "./components/admin/space/CreateSpace.tsx";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <RoutePolicy>
          <Navbar />
          <Routes>
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/spaces" element={<AdminSpacesPage />} />
            <Route path="/admin/create/space" element={<CreateSpacePage />} />
            <Route
              path="/admin/space/details/:id"
              element={<AdminSpaceDetailsPage />}
            />
            <Route path="/admin/update/space/:id" element={<UpdateSpace />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route
              path="/admin/user/details/:id"
              element={<AdminUserDetailsPage />}
            />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/signin" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
          </Routes>
        </RoutePolicy>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
