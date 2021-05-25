import React, { useState, useRef } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";

// import { Link } from "react-router-dom";
export default function SignUp() {
  const { signUpWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();

  async function handleEmailAndPasswordSignUp(e) {
    e.preventDefault();

    // Validate email and password
    if (!emailRef.current.value) {
      setError("Please enter your email address");
      return;
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords don't match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUpWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push("/");
    } catch {
      setLoading(false);
      setError("Can't sign up using email and password");
    }
  }

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div className="flex flex-col items-center justify-center border-black border-2 p-3">
        <p>Welcome to MyAwesome ToDo</p>
        {error && <Alert variant="danger">{error}</Alert>}

        <form>
          <div className="container my-3 flex flex-col">
            <label className="mb-1" htmlFor="email">
              Email
            </label>
            <input type="email" ref={emailRef} required />
          </div>

          <div className="container my-3 flex flex-col">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input type="password" ref={passwordRef} required />
          </div>

          <div className="container my-3 flex flex-col">
            <label className="mb-1" htmlFor="password">
              Confirm Password
            </label>
            <input type="password" ref={confirmPasswordRef} required />
          </div>
        </form>
        <button
          className="w-2/3 my-3 p-2 border rounded-md font-bold bg-blue-400 hover:bg-blue-500"
          disabled={loading}
          onClick={handleEmailAndPasswordSignUp}
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
