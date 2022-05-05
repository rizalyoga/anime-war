import React, { useState } from "react";
import Layout from "@/layout/Layout";
import styles from "@/styles/form.module.css";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    router.push("/login");
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Register Form</h1>
          <form className={styles.glass} onSubmit={handleRegister}>
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
              <p>
                Alredy have an account ?<a href="/login"> Login</a>
              </p>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
