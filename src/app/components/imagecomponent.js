import { useEffect, useRef } from "react";
import Image from "next/image";
import Imagep from "./imageprocessingcomponent/imagep";
export default function Imagecomponent({ tag }) {
  const { download, canvasref, imageref } = Imagep(tag);
  return (
    <div className="imgcontainer">
      <canvas
        id="canvas"
        ref={canvasref}
        width="900px"
        height="600px"
        style={{ backgroundColor: "white" }}
      ></canvas>
      <Image
        // style={{ display: "none" }}
        src={tag.imageurl}
        ref={imageref}
        width={900}
        height={600}
      />
      <button onClick={download} className="dbtn">
        Download
      </button>
    </div>
  );
}
