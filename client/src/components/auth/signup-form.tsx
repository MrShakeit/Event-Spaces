import { Formik } from "formik";
import signupValidationSchema from "../../validation/signupValidation";
import { Link } from "react-router-dom";
import { authenticationApi } from "../../api/authentication-api";
import { CreateUserDto } from "../../pages/types/users";
import { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const SignUp = () => {
  const [error, setError] = useState();
  const handleSubmit = async (
    user: CreateUserDto,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const response = await authenticationApi.signUp(user);

      console.log("SignUp succesful", response);
    } catch (error) {
      console.error("Error during signup:", error);
      setFieldError("");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container>
      <Row className="text-center text-xl font-semibold leading-6 text-gray-900 border-bottom">
        <Col lg={11} xs={10}>
          <h2>Sign up to Event Spaces</h2>
        </Col>
      </Row>
      <Row className="pt-5 justify-content-center">
        <Col lg={6}>
          <Formik
            validationSchema={signupValidationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              email: "",
              password: "",
              confirm_password: "",
              name: {
                first: "",
                //middle: "",
                last: "",
                prefix: "",
              },
              gender: "",
              address: {
                city: "",
                street: "",
                number: "",
                postalCode: "",
                subdivision: "",
                barangay: "",
              },
              // govIdPicture: "", // Add this line
              // isCityMember: false, // Add this line
              // isBlocked: false, // Add this line
            }}
          >
            {({
              touched,
              errors,
              values,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleBlur,
            }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <h5 className="text-center text-danger">{error}</h5>
                  <Form.Group className="my-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="off"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirm_password && !!errors.confirm_password
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirm_password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Prefix</Form.Label>
                    <Form.Control
                      as="select"
                      name="name.prefix"
                      value={values.name.prefix}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name?.prefix && !!errors.name?.prefix}
                    >
                      <option value="">Select prefix</option>
                      <option value="male">Mr</option>
                      <option value="female">Mrs</option>
                      <option value="other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.prefix}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name="name.first"
                      value={values.name.first}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name?.first && !!errors.name?.first}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.first}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name="name.last"
                      value={values.name?.last}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name?.last && !!errors.name?.last}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.last}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.gender && !!errors.gender}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>City and Postal Code</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="address.city"
                        value={values.address?.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.city && !!errors.address?.city
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        name="address.postalCode"
                        value={values.address?.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.postalCode &&
                          !!errors.address?.postalCode
                        }
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.city}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Street and Street Number</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Street"
                        name="address.street"
                        value={values.address?.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.street && !!errors.address?.street
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="Street Number"
                        name="address.number"
                        value={values.address?.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.number && !!errors.address?.number
                        }
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.street}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Subdivision and Barangay</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Subdivision"
                        name="address.subdivision"
                        value={values.address?.subdivision}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.subdivision &&
                          !!errors.address?.subdivision
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder="Barangay"
                        name="address.barangay"
                        value={values.address?.barangay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.address?.barangay &&
                          !!errors.address?.barangay
                        }
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.subdivision}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                  <Row className="text-center">
                    <Form.Text className="text-muted w-100">
                      Already have an account?{" "}
                      <Link to="/auth/signin">Sign in</Link>
                    </Form.Text>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
