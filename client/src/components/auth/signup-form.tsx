import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import signupValidationSchema from "../../validation/signupValidation";
import { Link } from "react-router-dom";
import { authenticationApi } from "../../api/authentication-api";
import { CreateUserDto } from "../../pages/types/users";

const SignUp: React.FC = () => {
  // const handleSubmit = async (values: any, { setSubmitting }: any) => {
  //   try {
  //     console.log("Submitting form with values:", values);

  //     // Send sign-up data to the server
  //     const response = await fetch("http://localhost:8000/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });
  //     console.log("Server response:", response);

  //     if (response.ok) {
  //       // Sign-up successful
  //       console.log("Sign-up successful!");
  //     } else {
  //       // Sign-up failed
  //       const responseData = await response.json();
  //       console.log("Sign-up failed:", responseData.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during sign-up:", error);
  //     console.error("Validation error:", ValidationError);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-8 text-center text-xl font-semibold leading-6 text-gray-900">
          Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
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
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="mx-auto space-y-4 w-80">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <div className="flex justify-center items-center">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex justify-center items-center">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <div className="flex justify-center items-center">
                    <Field
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
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

              <div className="flex space-x-2">
                <div className="flex-grow">
                  <label
                    htmlFor="name.prefix"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prefix
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      name="name.prefix"
                      className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                    </Field>
                  </div>
                </div>
                <div className="flex-grow">
                  <label
                    htmlFor="name.first"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="name.first"
                        placeholder="First Name"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <ErrorMessage
                      name="name.first"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name.last"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="name.last"
                    placeholder="Last Name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name.last"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    value={values.gender} // Set the selected value
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
              </div>
              <div className="flex space-x-2">
                <div>
                  <label
                    htmlFor="address.city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="address.city"
                        placeholder="City"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <ErrorMessage
                      name="address.city"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.postalCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Postal Code
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="address.postalCode"
                      placeholder="XX/XXX"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="address.postalCode"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <div>
                  <label
                    htmlFor="address.street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street
                  </label>
                  <div className="mt-2">
                    <Field
                      name="address.street"
                      placeholder="Street"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="address.street"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street Number
                  </label>
                  <div className="mt-2">
                    <Field
                      name="address.number"
                      placeholder="Street Number"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="address.number"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div>
                  <label
                    htmlFor="address.subdivision"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subdivision
                  </label>
                  <div className="mt-2">
                    <Field
                      name="address.subdivision"
                      placeholder="Subdivision"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="address.subdivision"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.barangay"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Barangay
                  </label>
                  <div className="mt-2">
                    <Field
                      name="address.barangay"
                      placeholder="Barangay"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="address.barangay"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mb-5 text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/auth/signin"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
