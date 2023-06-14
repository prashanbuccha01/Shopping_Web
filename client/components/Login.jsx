import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSession, signIn } from "next-auth/react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const { data: session } = useSession();

  const handleAppLogin = (provider) => {
    signIn(provider, { callbackUrl: "/" });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(document.cookie);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        // Login successful
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );

        // Save the token in a cookie
        if (rememberMe) {
          Cookies.set("token", token, { expires: 7 });
        }

        // Redirect to home page or desired route
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      // Handle error case here
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred during login. Please try again.",
      });
    } finally {
      setLoading(false); // Set loading back to false after login attempt
    }
  };

  return (
    <div className="">
      <div className="p-8 lg:w-1/2 mx-auto mb-[20vh]">
        <div className="bg-white rounded-t-lg p-8">
          <p className="text-center text-sm text-gray-400 font-light">
            Sign in with
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
        <div className="rounded-b-lg py-12 px-4 lg:px-24">
          <p className="text-center text-sm text-black-500 font-light">
            Or sign in with credentials
          </p>
          <form className="mt-6">
            <div className="relative">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-black-500 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
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
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-black-500 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
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
            <div className="flex flex-wrap justify-between align-center">
              <div className="mt-4 flex items-center text-black-500">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-3"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="remember text=[1rem]">Remember me</label>
              </div>
              <div className=" w-100 mt-4 text-blue-500 text=[1rem]">
                <Link href="/resetpassword">Forget Password?</Link>
              </div>
            </div>
            <div className="text-blue-500 text-center text-md mt-2">
              <Link href="/register">Register?</Link>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                type="submit"
                onClick={handleLogin}
                disabled={loading} // Disable the button during loading
              >
                {loading ? "Signing in..." : "Sign in"}{" "}
                {/* Change button text based on loading state */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
