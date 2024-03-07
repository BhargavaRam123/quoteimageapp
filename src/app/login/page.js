"use client";
import { useState } from "react";
import User from "../services/operations/user";
import styles from "./login.module.css";
export default function Login() {
  const { login_op } = User();
  const [obj, setobj] = useState({
    email: "",
    password: "",
  });
  async function handleonsubmit(e) {
    e.preventDefault();
    login_op(obj);
  }
  function handlechange(e) {
    setobj((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  return (
    <div className={styles.maincontainer}>
      <form onSubmit={handleonsubmit}>
        <div className={styles.container}>
          <div>Login</div>

          <div>
            <div>Email</div>
            <div>
              <input
                type="text"
                value={obj.email}
                name="email"
                onChange={handlechange}
              />
            </div>
          </div>
          <div>
            <div>Password</div>
            <div>
              <input
                type="text"
                value={obj.password}
                name="password"
                onChange={handlechange}
              />
            </div>
          </div>

          <div>
            <button className={styles.btn}>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
