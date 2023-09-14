import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { UserEntity } from "../../../pages/types/users";
import { useNavigate } from "react-router-dom";
import placeholder from "../../../assets/icon/placeholder.jpg";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    try {
      const response = await adminApi.getUsers({ limit: 20, page });
      setUsers(response);
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
        Users Page
      </h2>
      <Col className="text-end">
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          />
          <Pagination.Item active>{currentPage + 1}</Pagination.Item>
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={users.length < 20}
          />
        </Pagination>
      </Col>
      <Row className="mt-4">
        {users.map((user, i) => (
          <Col key={i} sm={6} md={4} lg={2}>
            <Card
              onClick={() => navigate(`/admin/user/details/${user._id}`)}
              className="cursor-pointer"
            >
              <Card.Img
                variant="top"
                src={placeholder}
                alt=""
                className="h-12 w-12 rounded-full ring-2 ring-white"
              />
              <Card.Body>
                <Card.Title>{user.email}</Card.Title>
                <Card.Title>
                  {user.name?.first} {user.name?.last}
                </Card.Title>
                <Card.Text>Gender: {user.gender}</Card.Text>
                <Card.Text>
                  {user.address?.city}, {user.address?.barangay}
                </Card.Text>
                <Card.Text>
                  {user.address?.street}, {user.address?.number}
                </Card.Text>
                <Card.Text>
                  {user.address?.subdivision}, {user.address?.postalCode}
                </Card.Text>
                <Card.Text>{user.isBlocked}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminUsersPage;
