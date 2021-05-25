import React, { useState, useRef } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";

export default function LogIn() {
  const { logInWithEmailAndPassword, logInWithGoogleAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  async function handleGoogleAccountLogIn(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await logInWithGoogleAccount();
      setLoading(false);
      history.push("/");
    } catch {
      setLoading(false);
      setError("Can't logIn using google account");
    }
  }

  async function handleEmailAndPasswordLogIn(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await logInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push("/");
    } catch {
      setLoading(false);
      setError("Can't logIn using email and password");
    }
  }

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div className="flex flex-col items-center justify-center border-black border-2 p-2">
        <p>Welcome to MyAwesome ToDo</p>
        {error && <Alert variant="danger">{error}</Alert>}

        <button
          className="w-2/3 p-2 my-3 border rounded-md font-bold bg-green-400 hover:bg-green-500"
          disabled={loading}
          onClick={handleGoogleAccountLogIn}
        >
          LogIn With Google
        </button>

        <form>
          <div className="container my-3">
            <label className="mb-1 w-1/3" htmlFor="email">
              Email
            </label>
            <input className="w-2/3" type="email" ref={emailRef} required />
          </div>

          <div className="container my-3">
            <label className="mb-1 w-1/3" htmlFor="password">
              Password
            </label>
            <input
              className="w-2/3"
              type="password"
              ref={passwordRef}
              required
            />
          </div>
        </form>
        <button
          className="w-2/3 my-3 p-2 border rounded-md font-bold bg-blue-400 hover:bg-blue-500"
          disabled={loading}
          onClick={handleEmailAndPasswordLogIn}
        >
          LogIn
        </button>
        <p>
          Need an account ?{" "}
          <Link className="underline" to="/signup">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
