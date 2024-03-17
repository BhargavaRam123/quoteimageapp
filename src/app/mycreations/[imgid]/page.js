"use client";
import Image from "next/image";
import styles from "./imgid.module.css";
import { BsTwitterX } from "react-icons/bs";
import { useEffect, useState } from "react";
import User from "@/app/services/operations/user";
import { useSelector } from "react-redux";
export default function Page({ params }) {
  const [img, setimg] = useState();
  const { token, email } = useSelector((state) => state.User);
  const { getcreationbyid_op, uploadfiletotwittercloud_op } = User();
  async function callapi() {
    const res = await getcreationbyid_op(token, params.imgid);
    console.log("response object is:", res);
    setimg(res.data.image);
  }
  useEffect(() => {
    callapi();
  }, []);
  async function handleclick(url) {
    const imageblob = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
    uploadfiletotwittercloud_op(imageblob, email);
  }
  console.log("params:", params);
  return (
    <div className={styles.container}>
      {img ? <Image src={img.url} width={500} height={500} /> : null}
      <div className={styles.xcontainer} onClick={() => handleclick(img.url)}>
        <BsTwitterX style={{ width: "40px", height: "40px" }} />
        <div>Tweet on X</div>
      </div>
    </div>
  );
}
