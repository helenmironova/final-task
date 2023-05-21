import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import "../AuthForm.css";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { clearErrors, selectAuth, signUp } from "../../../features/auth/authSlice";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      RepeatPassword: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Please enter a valid email")
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email"
        ),
      Password: Yup.string()
        .required("Please enter a password")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter"),
      RepeatPassword: Yup.string()
        .required("Please repeat your password")
        .oneOf([Yup.ref("Password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      const { Email, Password } = values;
      dispatch(signUp({ email: Email, password: Password }));
    },
  });
  return (
    <form className="authCard" onSubmit={formik.handleSubmit}>
      <h2>Sign up</h2>
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

      <TextField
        error={
          !!(formik.touched.RepeatPassword && formik.errors.RepeatPassword)
        }
        id="RepeatPassword"
        name="RepeatPassword"
        label="Repeat Password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue={formik.values.RepeatPassword}
        sx={{ width: "100%", marginTop: "30px" }}
      />
      <span className="authCard__error">
        {formik.touched.RepeatPassword && formik.errors.RepeatPassword
          ? formik.errors.RepeatPassword
          : " "}
      </span>
      <div className="auth__error">
        {authState.error ? authState.error : ""}
      </div>
      {authState.loading ? (
        <CircularProgress className="authCard__spinner" />
      ) : (
        ""
      )}
      <Button
        disabled={
          !!formik.errors.Password ||
          !!formik.errors.Email ||
          !!formik.errors.RepeatPassword ||
          formik.values.Password === "" ||
          formik.values.Email === "" ||
          formik.values.RepeatPassword === ""
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
        Create Account
      </Button>

      <div className="authCard__footer">
        Already have an account?
        <NavLink to="/auth" className="authCard__link" onClick={() => dispatch(clearErrors())}>
          Login
        </NavLink>
      </div>
    </form>
  );
};

export default SignupForm;
