"use client";
import { tags } from "./constants/selectarray";
import NeubrutalismButton from "./components/button/button";
import Mainapi from "./components/apicomponent/mainapi";
import Imagecomponent from "./components/imagecomponent";
import Radiocomp from "./components/radiocomp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [init,setinit] = useState(0)
  const { token } = useSelector((state) => state.User);
  const { tag, settag, handleonclick } = Mainapi();

  function onchange(e) {
    settag((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  useEffect(()=>{
    if(!token)
      {
        router.push("/login")
      }
  },[token])
  console.log("tag value:", tag);
  return (
    <>
      <div className="maincontainer">
        <div className="container">
          <div>
            <div className="heading">Quote Type</div>
            <div>
              <select name="quote" onChange={onchange} className="inputs">
                {tags.map((val) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="heading">Image Tag</div>
            <div>
              <input
                type="text"
                name="image"
                value={tag.image}
                onChange={onchange}
                style={{textAlign:"left"}}
                className="inputs"
              />
            </div>
          </div>
        </div>
        <Radiocomp tag={tag} settag={settag} />
        <div>
          {/* <button onClick={handleonclick} className="btn">
            Get
          </button> */}
          <div onClick={handleonclick}>
          <NeubrutalismButton value="Get"/>
          </div>
        </div>

        <Imagecomponent tag={tag} init={init} setinit={setinit} />
      </div>
    </>
  ) 
}
