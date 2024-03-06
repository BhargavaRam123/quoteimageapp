"use client";
import { useRouter } from "next/navigation";
import { apiconnector } from "../apiconnector";
import { Userroutes } from "./api";
import toast from "react-hot-toast";
import { UseSelector, useSelector } from "react-redux";
export default function User() {
  const { email, password, confirmpassword, username, otp } = useSelector(
    (state) => state.Signup
  );
  const router = useRouter();
  async function sendotpop() {
    const toastid = toast.loading("Loading....");
    try {
      const otpres = await apiconnector("POST", Userroutes.sendotp, {
        email: email,
      });
      console.log("send otp response:", otpres);
      router.push("/otp");
      toast.dismiss(toastid);
      toast.success("Otp Sent To the mail");
    } catch (error) {
      console.log("error occured in sendotpop function :", error.message);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  async function startsignup() {
    const toastid = toast.loading("Loading....");
    try {
      const signupres = await apiconnector("POST", Userroutes.signup, {
        email,
        password,
        confirmpassword,
        username,
        otp,
      });
      console.log("Signing Up", signupres);
      router.push("/");
      toast.dismiss(toastid);
      toast.success("Signed Up");
    } catch (error) {
      console.log("error occured in signup function :", error.message);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  return { sendotpop, startsignup };
}
