"use client";
import { useRouter } from "next/navigation";
import { apiconnector } from "../apiconnector";
import { Userroutes } from "./api";
import toast from "react-hot-toast";
export default function User() {
  const router = useRouter();
  async function sendotpop(email) {
    console.log("email value is:", email);
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
      console.log("error occured in sendotpop function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  async function startsignup({
    email,
    password,
    confirmpassword,
    firstname,
    lastname,
    otp1,
  }) {
    console.log(email, password, firstname, lastname, otp1);
    const toastid = toast.loading("Loading....");
    try {
      const signupres = await apiconnector("POST", Userroutes.signup, {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        otp: otp1,
      });
      console.log("Signing Up", signupres);

      router.push("/login");
      toast.dismiss(toastid);
      toast.success("Signed Up");
    } catch (error) {
      console.log("error occured in signup function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  async function login_op({ email, password }) {
    const toastid = toast.loading("Loading....");
    try {
      console.log("email and password", email, password);
      const loginres = await apiconnector("POST", Userroutes.login, {
        email: email,
        password: password,
      });
      console.log("login response:", loginres);

      // router.push("/");
      toast.dismiss(toastid);
      toast.success("Logged In");
    } catch (error) {
      console.log("error occured in login_op function :", error);
      toast.dismiss(toastid);
      toast.error("Error Occured");
    }
  }
  return { sendotpop, startsignup, login_op };
}
