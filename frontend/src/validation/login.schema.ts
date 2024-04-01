import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .max(250, "Max 250 symbols")
    .email("Incorrent email")
    .required("Required"),
  password: Yup.string()
    .min(3, "Min 3 symbols")
    .max(50, "Max 50 symbols")
    .required("Required"),
});
