import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Space } from "../../pages/types/spaces";
import { Button, Card, Col, Container } from "react-bootstrap";
import { spaceApi } from "../../api/space-api";
import spacepicture from "../../assets/icon/tennis.jpg";

export const SpaceDetailsPage = () => {
  const { id } = useParams();
  const [space, setSpaceDetails] = useState<Space | null>(null);
  const navigate = useNavigate();

  const fetchSpaceDetails = async () => {
    try {
      if (id) {
        const spaceDetailsResponse = await spaceApi.getUserSpaceDetails(id);
        setSpaceDetails(spaceDetailsResponse);
      }
    } catch (error) {
      console.error("Error fetching space details", error);
    }
  };

  useEffect(() => {
    fetchSpaceDetails();
  }, [id]);

  return (
    <Container className="mt-5">
      {space ? (
        <Card>
          <Card.Body>
            <Card.Title>{space.name}</Card.Title>
            <Card.Text>
              {space.address.city}, {space.address.street} {""}
              {space.address.number}. Size: {space.size}
            </Card.Text>
            <Card.Img src={spacepicture} alt="Space Image 1" />
            <Card.Text>
              <h6>Description:</h6>
              {space.description || "Description not available."}
            </Card.Text>
            <Button variant="primary">Book Space</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading space details...</p>
      )}
    </Container>
  );
};
