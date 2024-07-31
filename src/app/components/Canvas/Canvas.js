"use client";
import { useEffect, useState, useRef } from "react";
import { PDFDocument } from 'pdf-lib'
import User from "@/app/services/operations/user";
import { useSelector } from "react-redux";
import ShineButton from "../button/button";

const Canvas = ({ tag, init, setinit }) => {
  const { email } = useSelector((state) => state.User);
  const [imagename, setimagename] = useState("");
  const { uploadtocloud } = User();
  const [blobs,setblob] = useState()
  const ref = useRef();
  const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  async function btmpgenerator() {
    const res = await fetch(tag.imageurl);
    const blob = await res.blob();
    setblob(blob)
    const bmp = await createImageBitmap(blob);
    return bmp;
  }

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

  async function createimage(){
    const pdfDoc = await PDFDocument.create()
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.25)
    const pngDims = pngImage.scale(0.5)
    const page = pdfDoc.addPage()
    page.drawImage(jpgImage, {
      x: page.getWidth() / 2 - jpgDims.width / 2,
      y: page.getHeight() / 2 - jpgDims.height / 2,
      width: jpgDims.width,
      height: jpgDims.height,
    })
    const pdfBytes = await pdfDoc.save()
  }
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
