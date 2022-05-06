import React, { useState } from "react";
import styles from "@/styles/form.module.css";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { loginAccount } from "@/data/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);

    const payload = {
      identifier: email,
      password: password,
    };

    loginAccount(payload).then((res) => {
      setLoading((prev) => !prev);
      if (res == true) {
        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else {
        setError(res);
      }
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Login Form</h1>
          <form className={styles.glass} onSubmit={handleLogin}>
            <div className={styles.username}>
              <label htmlFor="Email">Email</label>
              <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className={styles.submit}>
              {error}
              <p>
                Don't have an account yet ?<a href="/register"> Register</a>
              </p>
              <button className="submit-button">{loading ? "please wait ... " : "Register"}</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
