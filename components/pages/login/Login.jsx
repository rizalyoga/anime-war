import React, { useState } from "react";
import styles from "@/styles/form.module.css";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    router.push("/home");
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Login Form</h1>
          <form className={styles.glass} onSubmit={handleLogin}>
            <div className={styles.username}>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className={styles.submit}>
              <p>
                Don't have an account yet ?<a href="/register"> Register</a>
              </p>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
