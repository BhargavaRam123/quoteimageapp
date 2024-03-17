"use client";
import { createElement, useEffect, useState } from "react";
import Link from "next/link";
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
  async function handleclick(url, name) {
    const imageblob = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageblob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  useEffect(() => {
    callapi();
  }, []);
  return (
    <div className={styles.cardcontainer}>
      {creations.map((o) => (
        <div>
          <div className={styles.card}>
            <Image src={o.url} fill />
          </div>
          <Link href={`/mycreations/${o.imageid}`}>click here</Link>
          <button onClick={() => handleclick(o.url, o.imgname)}>
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
