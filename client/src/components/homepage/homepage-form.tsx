import React, { useState, useEffect } from "react";
import { Space } from "../../pages/types/spaces";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import spacelogo from "../../assets/icon/spaceplaceholder.jpg";

const HomePageForm: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/admin/spaces?limit=20&page=0")
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Welcome to Event Spaces
      </h2>

      <Row className="mt-4">
        {spaces.map((space) => (
          <Col key={space.name} sm={6} md={4} lg={3}>
            <Card
              onClick={() => navigate("/space")}
              className="group cursor-pointer"
            >
              <Card.Img variant="top" src={spacelogo} alt={space.name} />
              <Card.Body>
                <Card.Title>{space.name}</Card.Title>
                <Card.Text>Size: {space.size}</Card.Text>
                <Card.Text className="text-primary">${space.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePageForm;
