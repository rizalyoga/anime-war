import React, { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import styles from "@/styles/form.module.css";
import { useRouter } from "next/router";
import { registerAccount } from "@/data/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userAuth");
    if (token) {
      router.push("/home");
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);

    const payload = {
      username,
      email,
      password,
    };
    registerAccount(payload).then((res) => {
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

  const toHomePage = () => {
    router.push("/");
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
              {error}
              <p>
                Alredy have an account ?<a href="/login"> Login</a>
              </p>
              <button className="submit-button">{loading ? "please wait ... " : "Register"}</button>
              <button className="submit-button" onClick={toHomePage}>
                Home Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
