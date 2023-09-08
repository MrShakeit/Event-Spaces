import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginValidationSchema from "../../validation/signinValidation";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { UserCredentials } from "../../pages/types/users";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [, setError] = useState("");

  const handleSubmit = async (
    values: UserCredentials,
    { setFieldError }: any
  ) => {
    try {
      setError("");
      await signIn(values);
      console.log("Successful login");
      navigate("/");
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
    } catch (error) {
      setFieldError("password", "Invalid email and/or password");
      console.log(error);
      setFieldError("email", "");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-8 text-center text-xl font-semibold leading-6 text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mx-auto space-y-6 w-80">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <div className="flex justify-center items-center ">
                  <Field
                    type="email"
                    name="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-center items-center">
                  <Field
                    type="password"
                    name="password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Not a member?
                <Link
                  to="/auth/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
