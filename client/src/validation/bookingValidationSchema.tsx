import * as Yup from "yup";

const bookingValidationShema = Yup.object().shape({
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  space_id: Yup.string().required("Space ID is required"),
  user_id: Yup.string().required("User ID is required"),
  is_approved: Yup.boolean(),
  is_canceled: Yup.boolean(),
  is_deleted: Yup.boolean(),
  is_paid: Yup.boolean(),
  paid: Yup.number().min(0, "Paid amount cannot be negative"),
  reason: Yup.string(),
  penalty_info: Yup.string(),
});

export default bookingValidationShema;
