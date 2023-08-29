import * as Yup from "yup";

const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .max(200)
    .required("Email is required"),
  password: Yup.string().min(8).max(200).required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  name: Yup.object().shape({
    first: Yup.string().max(100).required("First name is required"),
    //middle: Yup.string().max(100).optional(),
    last: Yup.string().max(100).required("Last name is required"),
    prefix: Yup.string().max(100).optional(),
  }),
  gender: Yup.string().max(20).optional(),
  address: Yup.object().shape({
    city: Yup.string().max(100).required(),
    street: Yup.string().max(100).required(),
    number: Yup.string().max(100).required(),
    postalCode: Yup.string().max(100).required(),
    subdivision: Yup.string().max(100).required(),
    barangay: Yup.string().max(100).required(),
  }),
});

export default signupValidationSchema;
