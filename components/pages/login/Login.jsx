import React, { useState } from "react";
import styles from "@/styles/form.module.css";
import Layout from "@/layout/Layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Login Form</h1>
          <form className={styles.glass} onSubmit={handleSubmit}>
            <div className={styles.username}>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={styles.password}>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className={styles.submit}>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
