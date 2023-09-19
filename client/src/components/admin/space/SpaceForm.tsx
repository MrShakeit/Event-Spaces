import { Formik } from "formik";
import { CreateSpace } from "../../../pages/types/spaces";
import spaceValidationSchema from "../../../validation/createSpaceValidation";
import { Button, Col, Row, Form, Container } from "react-bootstrap";

interface Props {
  space?: CreateSpace;
  handleSubmit(space: CreateSpace): Promise<void>;
}
export const SpaceForm = ({ space, handleSubmit }: Props) => {
  const initialValues: CreateSpace = space || {
    name: "",
    address: {
      city: "",
      street: "",
      number: "",
      floor: 0,
      room_no: 0,
      other: "",
    },
    size: "",
    price: 0,
    resident_price: 0,
    image: "",
    images: [],
    videos: [],
    description: "",
    is_deleted: false,
    is_blocked: false,
  };

  return (
    <Container>
      <Row className="border-bottom">
        <Col lg={11} xs={10}>
          <h2>{!!space ? "Update Space" : "Create Space"}</h2>
        </Col>
      </Row>
      <Row className="pt-5 justify-content-center">
        <Col lg={6}>
          <Formik
            validationSchema={spaceValidationSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            {({ touched, errors, handleSubmit, isSubmitting }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <h5 className="text-center text-danger"></h5>

                  <Form.Group className="my-3">
                    <Form.Label>Space Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Space Name"
                      className={
                        errors.name && touched.name ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.city"
                      placeholder="City"
                      className={
                        errors.address?.city && touched.address?.city
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.street"
                      placeholder="Street"
                      className={
                        errors.address?.street && touched.address?.street
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.street}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.number"
                      placeholder="Street Number"
                      className={
                        errors.address?.number && touched.address?.number
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.number}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>Floor</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.floor"
                      placeholder="Floor"
                      className={
                        errors.address?.floor && touched.address?.floor
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.floor}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.room_no"
                      placeholder="Room Number"
                      className={
                        errors.address?.room_no && touched.address?.room_no
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.room_no}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>Other Address Info</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.other"
                      placeholder="Other Address Info"
                      className={
                        errors.address?.other && touched.address?.other
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.other}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      type="text"
                      name="size"
                      placeholder="Size"
                      className={
                        errors.size && touched.size ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Price"
                      className={
                        errors.price && touched.price ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>City Resident Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="resident_price"
                      placeholder="City Resident Price"
                      className={
                        errors.resident_price && touched.resident_price
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.resident_price}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      className={
                        errors.image && touched.image ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Images (comma-separated URLs)</Form.Label>
                    <Form.Control
                      type="text"
                      name="images"
                      placeholder="Image URLs"
                      className={
                        errors.images && touched.images ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.images}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Videos */}
                  <Form.Group className="my-3">
                    <Form.Label>Videos (comma-separated URLs)</Form.Label>
                    <Form.Control
                      type="text"
                      name="videos"
                      placeholder="Video URLs"
                      className={
                        errors.videos && touched.videos ? "is-invalid" : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.videos}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      className={
                        errors.description && touched.description
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Check
                      type="checkbox"
                      label="Deleted"
                      name="is_deleted"
                    />
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Check
                      type="checkbox"
                      label="Blocked"
                      name="is_blocked"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {!!space ? "Update Space" : "Create Space"}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
