import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./pages/auth/signin.tsx";
import SignUpPage from "./pages/auth/signup.tsx";
import HomePage from "./components/homepage/homepage-form.tsx";
import { AuthContextProvider } from "./context/auth-context.tsx";
import Navbar from "./components/navbar/navbar.tsx";

function App() {
  const handleClick = () => {
    fetch("http://localhost:8000/spaces?limit=2&page=0")
      .then((res) => res.json().then((data) => alert(JSON.stringify(data))))
      .catch((err) => console.log(err));
  };
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/signin" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
