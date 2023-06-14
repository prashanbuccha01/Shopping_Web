import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  username: Yup.string().required("Required!"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character!"
    )
    .required("Required!"),
});

const Register = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAppLogin = (provider) => {
    signIn(provider, { callbackUrl: "/" });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send the registration data to the API for validation
        const response = await fetch(
          "http://localhost:8000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          // Registration successful
          const userData = {
            email: values.email,
            username: values.username,
            // Add additional properties as per your requirement
          };

          // Save user data in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));

          // Save user data in cookies
          Cookies.set("userData", userData);

          // Redirect to the home page
          router.push("/");
        } else {
          // Registration failed
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  useEffect(() => {
    // Check if the user is already logged in
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    if (userData) {
      // Redirect to the home page if the user is already logged in
      router.push("/");
    }
  }, [router]);
  return (
    <div>
      <div className="">
        <div className="p-8 lg:w-1/2 mx-auto">
          <div className=" rounded-t-lg p-8">
            <p className="text-center text-sm text-black-500 font-light">
              Sign up with
            </p>
            <div>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <button
                  className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={() => handleAppLogin("facebook")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#1877F2"
                      d="M38.4 16H26V12c0-1.6.8-3.2 3.2-3.2H38c.4 0 .8.4.8.8v3.2h-3.2c-.8 0-1.6.8-1.6 1.6v3.2h3.2l-.8 3.2H34V36h-4.8V24.8H26V21.6H30V16h-3.2c-2.4 0-4-1.6-4-3.2 0-2.8 2.4-3.2 3.2-3.2h3.2V6.4c0-.8 0-2.4 0-2.4h4.8s.4 1.6.4 2.4v3.2h4.8L38.4 16z"
                    />
                  </svg>
                  Facebook
                </button>
                <button
                  className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={() => handleAppLogin("google")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#e53935"
                      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1565c0"
                      d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div>
          </div>
          <div className=" rounded-b-lg py-12 px-4 lg:px-24">
            <p className="text-center text-sm text-black-500 font-light">
              {" "}
              Or sign up with credentials{" "}
            </p>
            <form className="mt-6" onSubmit={formik.handleSubmit}>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-black-500 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500">{formik.errors.username}</div>
                ) : null}
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-black-500 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M10 0a5 5 0 100 10c2.5 0 5-.957 5-2.5S12.5 5 10 5s-5 .957-5 2.5S7.5 10 10 10a5 5 0 010 10 5 5 0 010-10c2.5 0 5-.957 5-2.5S12.5 5 10 5c-.845 0-1.654.183-2.375.52l-.89-1.963A6.461 6.461 0 0110 0zm0 7a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-black-500 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-black-500 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-black-500 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-black-500 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-gray-500">
                {" "}
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-2"
                />{" "}
                <label className="text-sm" for="remember">
                  I agree with the{" "}
                  <a className="text-indigo-400 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <div className="flex items-center justify-center mt-8">
                {" "}
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  type="submit"
                >
                  {" "}
                  Create Account{" "}
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
