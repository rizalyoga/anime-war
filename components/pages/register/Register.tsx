import React, { useState, useEffect,FC,MouseEventHandler } from "react";
import Layout from "@/layout/Layout";
import styles from "@/styles/form.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { registerAccount } from "@/data/auth";
import getToken from "utils/getCookies";
import { BsFillEyeFill } from "react-icons/bs";
import Animation from "@/components/animation/animation";

export interface RegisterPayload {
  username:string ;
  email:string;
  password:string;
}

const Register:FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/home");
    }
  }, []);

  // Funtion for set Show password
  const showPass = () => {
    setIsShow((prev) => !prev);
  };

  // Register hanle
  const handleRegister = (e:any):void => {
    e.preventDefault();
    setLoading((prev) => !prev);

    const payload:RegisterPayload = {
      username,
      email,
      password,
    };

    registerAccount(payload).then((res:any):void => {
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

  // Direction Funtion
  const toHomePage:MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/");
  };

  return (
    <Layout title={"Register"}>
      <div className="container">
        <div className={styles["form-container"]}>
          <Animation>
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
                <div className={styles["input-pass"]}>
                  <input type={isShow ? "text" : "password"} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                  <BsFillEyeFill className={isShow ? styles["eye-view-show"] : styles["eye-view-hidden"]} onClick={showPass} />
                </div>
              </div>
              <div className={styles.submit}>
                <p className={styles['error-message']}>{error}</p>
                <p>
                  Alredy have an account ?
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </p>
                <button className="submit-button">{loading ? "please wait ... " : "Register"}</button>
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

export default Register;
