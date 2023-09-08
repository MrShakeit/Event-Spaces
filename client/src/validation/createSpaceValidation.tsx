import * as Yup from "yup";

const spaceValidationSchema = Yup.object().shape({
  name: Yup.string().trim().min(0).max(200).required(),
  address: Yup.object().shape({
    city: Yup.string().trim().min(0).max(200).required(),
    street: Yup.string().trim().min(0).max(200).required(),
    number: Yup.string().trim().min(1).max(100),
    floor: Yup.string().trim().min(0).max(200),
    room_no: Yup.number(),
    other: Yup.string().trim().min(0).max(200),
  }),
  size: Yup.string().trim().min(0).max(200),
  price: Yup.number(),
  resident_price: Yup.number(),
  image: Yup.string().trim().min(0).max(200),
  images: Yup.array().of(Yup.string().url("Invalid URL")),
  videos: Yup.array().of(Yup.string().url("Invalid URL")),
  description: Yup.string().trim().min(8).max(200),
  is_deleted: Yup.boolean().required(),
  is_blocked: Yup.boolean().required(),
});

export default spaceValidationSchema;
