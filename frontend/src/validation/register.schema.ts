import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Min 3 symbols")
    .required("Required")
    .max(50, "Max 50 symbols"),
  last_name: Yup.string()
    .min(3, "Min 3 symbols")
    .required("Required")
    .max(50, "Max 50 symbols")
    .required("Required"),
  email: Yup.string()
    .trim()
    .email("Incorrent email")
    .max(250, "Max 250 symbols")
    .required("Required"),
  password: Yup.string()
    .min(3, "Min 3 symbols")
    .max(50, "Max 50 symbols")
    .required("Required"),
});
