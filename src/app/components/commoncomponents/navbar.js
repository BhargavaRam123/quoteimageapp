"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";
import { logout } from "@/app/redux/slices/userslice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { email } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const router = useRouter();
  function onlogout() {
    dispatch(logout());
    router.push("/login");
  }
  function onmycreations() {
    router.push("/mycreations");
  }
  function oncreate() {
    router.push("/");
  }
  return email ? (
    <div className={styles.container}>
      <div className={styles.card} onClick={oncreate}>
        Create
      </div>
      <div className={styles.card} onClick={onmycreations}>
        My Creations
      </div>
      <div className={styles.card}>Profile</div>
      <div className={styles.card} onClick={onlogout}>
        Logout
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.card}>Login</div>
      <div className={styles.card}>Sign Up</div>
      <div className={styles.card}>About</div>
      <div className={styles.card}>Contact Us</div>
    </div>
  );
}
