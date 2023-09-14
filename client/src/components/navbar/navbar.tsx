import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import logo from "../../assets/icon/Valenzuela_Seal.png";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "../../index.css";

const Topbar = () => {
  const { permissionFlags, signOut, status } = useAuth();

  const handleSignOut = () => {
    signOut();
  };
  console.log(status);

  return (
    <Navbar bg="white" className="shadow p-3 mb-5 bg-white rounded">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Government Office Logo"
            />
          </Link>
        </Navbar.Brand>
        <Nav>
          {status === "authenticated" ? (
            <>
              {permissionFlags === 12 && (
                <>
                  <Nav.Item>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/admin/users">Users</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/admin/spaces">Spaces</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/admin/bookings">Bookings</Nav.Link>
                  </Nav.Item>
                </>
              )}

              <Nav.Item>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link to="/auth/signup" className="nav-link">
                  Sign Up
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/auth/signin" className="nav-link">
                  Sign In
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
