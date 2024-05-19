import Canvas from "./Canvas/Canvas";
export default function Imagecomponent({ tag,init,setinit }) {
  return (
    <div className="imgcontainer">
      <Canvas tag={tag} init={init} setinit={setinit} />
    </div>
  );
}
