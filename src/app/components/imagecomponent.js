import Canvas from "./Canvas/Canvas";
export default function Imagecomponent({ tag }) {
  return (
    <div className="imgcontainer">
      <Canvas tag={tag} />
    </div>
  );
}
