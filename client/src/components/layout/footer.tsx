import { Container, Nav, Navbar } from "react-bootstrap";

export const AboutUs = () => {
  return (
    <Navbar bg="primary" className="shadow-lg">
      <Nav className="ml-auto">
        <Nav.Link href="#about-us" className="">
          About Us
        </Nav.Link>

        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
  );
};
