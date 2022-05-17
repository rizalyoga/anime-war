import React, { useState, useEffect } from "react";
import styles from "@/styles/form.module.css";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { loginAccount } from "@/data/auth";
import getToken from "utils/getCookies";
import { BsFillEyeFill } from "react-icons/bs";
import Animation from "@/components/animation/animation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/home");
    }
  }, []);

  // Funtion for setShow password
  const showPass = () => {
    setIsShow((prev) => !prev);
  };

  // Login Handler
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

  // Direction Function
  const toHomePage = () => {
    router.push("/");
  };

  return (
    <Layout title={"Login"}>
      <div className="container">
        <div className={styles["form-container"]}>
          <Animation>
            <h1>Login Form</h1>
            <form className={styles.glass} onSubmit={handleLogin}>
              <div className={styles.username}>
                <label htmlFor="Email">Email</label>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.password}>
                <label htmlFor="password">Password</label>
                <div className={styles["input-pass"]}>
                  <input type={isShow ? "text" : "password"} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                  <BsFillEyeFill className={isShow ? styles["eye-view-show"] : styles["eye-view-hidden"]} onClick={showPass} />
                </div>
              </div>
              <div className={styles.submit}>
                {error}
                <p>
                  Don&apos;t have an account yet ?
                  <Link href="/register">
                    <a> Register</a>
                  </Link>
                </p>
                <button className="submit-button">{loading ? "please wait ... " : "Login"}</button>
                <button className="submit-button" onClick={toHomePage}>
                  Home Page
                </button>
              </div>
            </form>
          </Animation>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
