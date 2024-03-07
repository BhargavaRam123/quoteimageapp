"use client";
import { useEffect, useState } from "react";
import styles from "./signup.module.css";
import User from "../services/operations/user";
import { setuserdata } from "../redux/slices/signupslice";
import { useDispatch } from "react-redux";
export default function Signup() {
  const dispatch = useDispatch();
  const [obj, setobj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function handlechange(e) {
    setobj((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  const { sendotpop } = User();
  async function handleonsubmit(e) {
    e.preventDefault();
    console.log(obj);
    dispatch(setuserdata(obj));
    sendotpop(obj.email);
  }
  return (
    <div className={styles.maincontainer}>
      <form onSubmit={handleonsubmit}>
        <div className={styles.container}>
          <div>Sign Up</div>
          <div>
            <div>FirstName</div>
            <div>
              <input
                type="text"
                value={obj.firstname}
                name="firstname"
                onChange={handlechange}
              />
            </div>
          </div>
          <div>
            <div>LastName</div>
            <div>
              <input
                type="text"
                value={obj.lastname}
                name="lastname"
                onChange={handlechange}
              />
            </div>
          </div>

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
            <div>Confirm Password</div>
            <div>
              <input
                type="text"
                value={obj.confirmpassword}
                name="confirmpassword"
                onChange={handlechange}
              />
            </div>
          </div>
          <div>
            <button className={styles.btn}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
