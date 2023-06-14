import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: "email",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Save user credentials
      const credentials = {
        email: user.email,
        username: user.username,
        provider: account.provider,
      };
      try {
        const response = await axios.post(
          "https://localhost:8000/api/auth/savedata",
          credentials
        );
        if (response.status === 200) {
          localStorage.setItem("username", user.username);
          localStorage.setItem("photo", user.photo);
          localStorage.setItem("token", response.token);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

export default (req, res) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  NextAuth(req, res, options);
};
