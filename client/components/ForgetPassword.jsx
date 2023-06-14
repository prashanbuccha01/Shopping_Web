import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:8000/auth/api/forgotpassword",
        {
          email,
        }
      );

      console.log(response.data);
      setIsSubmitting(false);
      router.push("/login");
    } catch (error) {
      console.error(error);

      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-transparent lg:-mt-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-transparent">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white forget-title"
        >
          Reset Password
        </a>
        <div className="w-full p-6 bg-transparent rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 text-white">
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-purple-700 text-white bg-black hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 pt-0.2 text-center mr-2  dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
