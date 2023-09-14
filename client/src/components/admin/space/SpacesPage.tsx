import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { useNavigate } from "react-router-dom";
import { Space } from "../../../pages/types/spaces";
import spaceplaceholder from "../../../assets/icon/spaceplaceholder.jpg";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";

const AdminSpacesPage: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    try {
      const response = await adminApi.getSpaces({ limit: 20, page });
      setSpaces(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <Container className="mx-auto max-w-2xl px-4 sm:px-6 mt-4 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold mb-4 tracking-tight text-gray-900">
        Spaces Page
      </h2>
      <Row className="mt-4">
        <Col>
          <Button onClick={() => navigate("/admin/create/space")}>
            Create New Space
          </Button>
        </Col>
        <Col className="text-end">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            />
            <Pagination.Item active>{currentPage + 1}</Pagination.Item>
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={spaces.length < 20}
            />
          </Pagination>
        </Col>
      </Row>
      <Row className="mt-6">
        {spaces.map((space, i) => (
          <Col key={i} sm={6} md={4} lg={2} className="mb-4">
            <Card
              onClick={() => navigate(`/admin/space/details/${space._id}`)}
              className="cursor-pointer border p-2"
            >
              <Card.Img
                variant="top"
                src={spaceplaceholder}
                alt="space icon"
                className="h-48 w-100"
              />
              <Card.Body>
                <Card.Title>{space.name}</Card.Title>
                <Card.Text>{space.size}</Card.Text>
                <Card.Text>
                  {space.address?.street}, {space.address?.number}
                </Card.Text>
                <Card.Text>{space.price}$</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminSpacesPage;
