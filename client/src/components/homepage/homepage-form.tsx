import { useState, useEffect } from "react";
import { Space } from "../../pages/types/spaces";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import spacelogo from "../../assets/icon/spaceplaceholder.jpg";
import { spaceApi } from "../../api/space-api";

const HomePageForm = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    try {
      const response = await spaceApi.getSpaces({ limit: 20, page });
      setSpaces(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  return (
    <Container className="mt-5">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Welcome to Event Spaces
      </h2>

      <Row className="mt-4">
        {spaces.map((space) => (
          <Col key={space.name} sm={6} md={4} lg={3}>
            <Card
              onClick={() => navigate(`/space/details/${space._id}`)}
              className="group cursor-pointer"
            >
              <Card.Img variant="top" src={spacelogo} alt={space.name} />
              <Card.Body>
                <Card.Title>{space.name}</Card.Title>
                <Card.Text>
                  {space.address?.city},{space.address?.street},
                  {space.address?.number}
                </Card.Text>
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
