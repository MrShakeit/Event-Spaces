import { Formik } from "formik";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useState } from "react";
import { BookingEntity } from "../../../pages/types/bookings";
import bookingValidationShema from "../../../validation/bookingValidationSchema";

interface Props {
  booking?: BookingEntity;
  handleSubmit(booking: BookingEntity): Promise<void>;
}
export const BookingForm = ({ booking, handleSubmit }: Props) => {
  const [error, setError] = useState();
  const initialValues: BookingEntity = booking || {
    _id: "",
    start_date: "",
    end_date: "",
    space_id: "",
    user_id: "",
    is_approved: false,
    is_canceled: false,
    is_deleted: false,
    is_paid: false,
    paid: 0,
    reason: "",
    penalty_info: "",
  };
  return (
    <Container>
      <Row className="border-bottom">
        <Col lg={11} xs={10}>
          <h2>Booking Form</h2>
        </Col>
      </Row>
      <Row className="pt-5 justify-content-center">
        <Col lg={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={bookingValidationShema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="my-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="start_date"
                    placeholder="Start Date"
                    value={values.start_date}
                    onChange={handleChange}
                    isInvalid={touched.start_date && !!errors.start_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="end_date"
                    placeholder="End Date"
                    value={values.end_date}
                    onChange={handleChange}
                    isInvalid={touched.end_date && !!errors.end_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  Submit Booking
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
