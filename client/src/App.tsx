import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/signin.tsx";
import SignUpPage from "./pages/auth/signup.tsx";
import HomePage from "./components/homepage/homepage-form.tsx";
import { AuthContextProvider } from "./context/auth-context.tsx";
import AdminHomePage from "./components/admin/adminHomePage.tsx";
import RoutePolicy from "./components/auth/route-policy.tsx";
import AdminUsersPage from "./components/admin/user/UsersPage.tsx";
import AdminSpacesPage from "./components/admin/space/SpacesPage.tsx";
import { AdminBookingsPage } from "./components/admin/booking/BookingsPage.tsx";
import AdminUserDetailsPage from "./components/admin/user/UserDetails.tsx";
import AdminSpaceDetailsPage from "./components/admin/space/SpaceDetails.tsx";
import { UpdateSpace } from "./components/admin/space/UpdateSpace.tsx";
import { CreateSpacePage } from "./components/admin/space/CreateSpace.tsx";
import Topbar from "./components/layout/navbar.tsx";
import { AdminBookingDetailsPage } from "./components/admin/booking/BookingsDetails.tsx";
import { AdminUpdateBooking } from "./components/admin/booking/UpdateBooking.tsx";
import SpaceDetails from "./components/admin/space/SpaceDetails.tsx";
import { SpaceDetailsPage } from "./components/space/SpaceDetails.tsx";
import { AboutUs } from "./components/layout/footer.tsx";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <RoutePolicy>
          <Topbar />
          <Routes>
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route
              path="/admin/booking/details/:id"
              element={<AdminBookingDetailsPage />}
            />
            <Route
              path="/admin/update/booking/:id"
              element={<AdminUpdateBooking />}
            />
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
            <Route path="/space/details/:id" element={<SpaceDetailsPage />} />
          </Routes>
          <AboutUs />
        </RoutePolicy>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
