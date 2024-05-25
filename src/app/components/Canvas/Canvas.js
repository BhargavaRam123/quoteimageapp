"use client";
import { useEffect, useState, useRef } from "react";
import User from "@/app/services/operations/user";
import { useSelector } from "react-redux";
import ShineButton from "../button/button";

const Canvas = ({ tag, init, setinit }) => {
  const { email } = useSelector((state) => state.User);
  const [imagename, setimagename] = useState("");
  const { uploadtocloud } = User();
  const ref = useRef();
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  async function btmpgenerator() {
    const res = await fetch(tag.imageurl);
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    return bmp;
  }

  useEffect(() => {
    if (tag.imageurl !== "") {
      setinit(1);
    }
  }, [tag.imageurl, setinit]);

  useEffect(() => {
    if (init === 1) {
      const initializeCanvas = async () => {
        const canvas = ref.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          canvas.width = canvas.offsetWidth * pixelRatio;
          canvas.height = canvas.offsetHeight * pixelRatio;
          canvas.style.width = "900px";
          canvas.style.height = "600px";
          context.scale(pixelRatio, pixelRatio);
          context.font = "30px Arial";
          context.textAlign = "center";

          const image = await btmpgenerator();
          context.drawImage(image, 0, 0, 900, 600);

          const data = tag.quotedata[0]?.quote;
          const arr = data?.split(" ");
          let str = "";
          const farr = [];
          for (let i = 0; i < arr?.length; i++) {
            if (str?.length < 30) {
              str += arr[i] + " ";
            } else {
              farr.push(str);
              str = arr[i] + " ";
            }
          }
          farr.push(str);
          console.log("Modified array is:", farr);
          let x = canvas.width / 2; // Center horizontally
          let y = canvas.height / 2 - 220;
          for (let i = 0; i < farr.length; i++) {
            context.fillText(farr[i], x, y);
            y += 50;
          }
        }
      };
      initializeCanvas();
    }
  }, [init, tag.quotedata, pixelRatio]);

  async function handleonsubmit(e) {
    e.preventDefault();
    const canvas = ref.current;
    let imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    uploadtocloud(imageBlob, imagename, email);
  }

  const handleDownload = () => {
    const canvas = ref.current;
    const dataURL = canvas.toDataURL("image/jpeg");
    console.log("Data URL is:", dataURL);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = Date.now() + ".jpg";
    link.click();
  };

  return (
    <div>
      <canvas ref={ref} className={init === 0 ? "dnone" : "normal"} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div onClick={handleDownload}>
          <ShineButton value="Download" />
        </div>
      </div>
      <form
        onSubmit={handleonsubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white" }}>Upload To My Creations</div>
        <input
          type="text"
          onChange={(e) => setimagename(e.target.value)}
          value={imagename}
        />
        <ShineButton value="Upload" />
      </form>
    </div>
  );
};

export default Canvas;
