import React, { useState } from "react";
import Layout from "@/layout/Layout";
import styles from "@/styles/form.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Register Form</h1>
          <form className={styles.glass} onSubmit={handleSubmit}>
            <div className={styles.username}>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={styles.email}>
              <label htmlFor="username">Email</label>
              <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
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

export default Register;
