import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./AuthForm.scss";
import { Link } from "react-router";

export const AuthForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        favorites: [],
        createdAt: new Date(),
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>

        <label>
          Username
          <input
            type="text"
            id="username"
            placeholder="User..."
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            id="email"
            placeholder="Email..."
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            id="password"
            placeholder="Password..."
            onChange={handleChange}
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password..."
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};
