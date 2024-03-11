"use client";
import { useEffect, useState } from "react";
import User from "../services/operations/user";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "./mycreations.module.css";
export default function Mycreations() {
  const { email, token } = useSelector((state) => state.User);
  const { getcreations_op } = User();
  const [creations, setcreations] = useState([]);
  async function callapi() {
    const arr = await getcreations_op(email, token);
    console.log("array response", arr);
    setcreations(arr.data.images);
  }
  useEffect(() => {
    callapi();
  }, []);
  return (
    <div className={styles.cardcontainer}>
      {creations.map((o) => (
        <div className={styles.card}>
          <Image src={o.url} fill />
        </div>
      ))}
    </div>
  );
}
