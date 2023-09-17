import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup"; // Import your validation schema here
import { useAuth } from "../../context/auth-context";
import { UserCredentials } from "../../pages/types/users";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Replace with your authentication logic
  const [error, setError] = useState("");

  const submit = async (values: UserCredentials, { setFieldError }: any) => {
    try {
      setError("");
      await signIn(values);
      navigate("/");
    } catch (error) {
      setFieldError("password", `Invalid email and/or password`);
      setFieldError("email", ` `);
    }
  };

  return (
    <Container>
      <Row className="border-bottom">
        <Col>
          <h2 className="text-center text-xl font-semibold leading-6 text-gray-900">
            Sign in to your account
          </h2>
        </Col>
      </Row>
      <Row className="pt-5 justify-content-center">
        <Col lg={6}>
          <Formik
            validationSchema={loginValidationSchema}
            onSubmit={submit}
            initialValues={{ email: "", password: "" }}
          >
            {({
              touched,
              errors,
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <h5 className="text-center text-danger">{error}</h5>
                  <Form.Group className="mb-3 ">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
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
                      name="password"
                      placeholder="Enter Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col className="text-center text-xl font-semibold w-100">
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </Button>
                  </Col>

                  <Row className="text-center">
                    <Form.Text className="text-muted w-100">
                      Dont have an account? {""}
                      <Link to={"/auth/signup"}>Sign Up</Link>
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

export default Login;
