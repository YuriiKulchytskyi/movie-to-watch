import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      console.log("Logged in:", user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};
