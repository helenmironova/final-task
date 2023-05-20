import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import "../AuthForm.css";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectAuth, login } from "../../../features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Please enter a valid email")
        .required("Required"),
      Password: Yup.string()
        .required("Please enter a password")
        .min(6, "Password is too short - should be 6 chars minimum."),
    }),
    onSubmit: (values) => {
      const {Email, Password} = values;
      dispatch(login({email: Email, password: Password}))
    },
  });
  return (
    <form className="authCard" onSubmit={formik.handleSubmit}>
      <h2> Login </h2>
      <TextField
        error={!!(formik.touched.Email && formik.errors.Email)}
        id="Email"
        name="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue={formik.values.Email}
        label="Email"
        sx={{ width: "100%", marginTop: "30px" }}
      />
      <span className="authCard__error">
        {formik.touched.Email && formik.errors.Email
          ? formik.errors.Email
          : " "}
      </span>

      <TextField
        error={!!(formik.touched.Password && formik.errors.Password)}
        id="Password"
        name="Password"
        label="Password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue={formik.values.Password}
        sx={{ width: "100%", marginTop: "30px" }}
      />
      <span className="authCard__error">
        {formik.touched.Password && formik.errors.Password
          ? formik.errors.Password
          : " "}
      </span>

      <Button
        disabled={
          !!formik.errors.Password ||
          !!formik.errors.Email ||
          formik.values.Password === "" ||
          formik.values.Email === ""
        }
        className="btn__auth"
        type="submit"
        variant="contained"
        sx={{
          width: "100%",
          height: "50px",
          textTransform: "capitalize",
          backgroundColor: "#D8E7FF",
          boxShadow: "none",
          color: "#175BC0",
          borderRadius: "12px",
          margin: "30px 0",
        }}
      >
        Login
      </Button>

      <div className="authCard__footer">
        Don't have an account?
        <NavLink to="/auth/signup" className="authCard__link">
          Sign up
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
