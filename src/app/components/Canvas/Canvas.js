"use client";
import { useState } from "react";
import User from "@/app/services/operations/user";
import { useRef } from "react";
import { useSelector } from "react-redux"; 
import ShineButton from "../button/button";
const Canvas = ({ tag,init,setinit }) => {
  
  if(tag.imageurl!=='')
    setinit(1)
  const { email } = useSelector((state) => state.User);
  const [imagename, setimagename] = useState("");
  const { uploadtocloud } = User();
  async function handleonsubmit(e) {
    e.preventDefault();
    const canvas = ref.current;
    let imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    uploadtocloud(imageBlob, imagename, email);
  }
  const ref = useRef();
  // setinit(1)
  const pixelRatio = typeof window!=='undefined'? window.devicePixelRatio : 1;
  const image = new Image();
  image.src = tag.imageurl ? tag.imageurl : "";
  image.addEventListener("load", () => {
    
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * pixelRatio;
    canvas.height = canvas.offsetHeight * pixelRatio;
    canvas.style.width = "900" + "px";
    canvas.style.height = "600" + "px";
    context.scale(pixelRatio, pixelRatio);
    context.font = "30px Arial";
    context.textAlign = "center";
    context.drawImage(image, 0, 0, 900, 600);

    var data = tag.quotedata[0]?.quote;
    var arr = data?.split(" ");
    var str = "";
    var farr = [];
    for (var i = 0; i < arr?.length; i++) {
      if (str?.length < 30) {
        str += arr[i];
        str += " ";
      } else {
        farr.push(str);
        str = arr[i];
        str += " ";
      }
    }
    farr.push(str);
    console.log("modified array is:", farr);
    let x = canvas.width / 2 - 200; // Center horizontally
    let y = canvas.height / 2 - 220;
    for (let i = 0; i < farr.length; i++) {
      context.fillText(farr[i], x, y);
      y += 50;
    }
  });
  image.setAttribute("crossorigin", "anonymous");
  const handleDownload = () => {
    const canvas = ref.current;
    const dataURL = canvas.toDataURL("image/jpeg");
    console.log("dataurl is:", dataURL);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = Date.now() + ".jpg";
    link.click();
  };

  return (
    <div>
      <canvas ref={ref} className={init===0?"dnone":"normal"} />;
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <button
          onClick={handleDownload}
          download={Date.now() + ".jpg"}
          className="dbtn"
        >
          Download
        </button> */}
        <div onClick={handleDownload} download={Date.now() + ".jpg"}  >
        <ShineButton value="Download"/>
        </div>
      </div>
      <form onSubmit={handleonsubmit} style={{display:"flex",flexDirection:"column" ,alignItems:"center"}}>
        <div style={{color:"white"}}>Upload To My Creations</div>
        <input
          type="text"
          onChange={(e) => setimagename(e.target.value)}
          value={imagename}
        />
       <ShineButton value="Upload"/>
      </form>
    </div>
  );
};
export default Canvas;
