"use client";
import { useEffect, useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";

import { useSelector } from "react-redux";

const Canvas = ({ tag, init, setinit }) => {
  const [blobs, setblob] = useState();
  const ref = useRef();
  const pixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio : 1;

  async function btmpgenerator() {
    const res = await fetch(tag.imageurl);
    const blob = await res.blob();
    setblob(blob);
    const bmp = await createImageBitmap(blob);
    return bmp;
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

  async function createimage() {
    const pdfDoc = await PDFDocument.create();
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const jpgDims = jpgImage.scale(0.25);
    const pngDims = pngImage.scale(0.5);
    const page = pdfDoc.addPage();
    page.drawImage(jpgImage, {
      x: page.getWidth() / 2 - jpgDims.width / 2,
      y: page.getHeight() / 2 - jpgDims.height / 2,
      width: jpgDims.width,
      height: jpgDims.height,
    });
    const pdfBytes = await pdfDoc.save();
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
    </div>
  );
};

export default Canvas;
