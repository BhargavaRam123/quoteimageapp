"use client";
import { tags } from "./constants/selectarray";
import Mainapi from "./components/apicomponent/mainapi";
import Imagecomponent from "./components/imagecomponent";
import Radiocomp from "./components/radiocomp";
export default function Home() {
  const { tag, settag, handleonclick } = Mainapi();

  function onchange(e) {
    settag((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  console.log("tag value:", tag);
  return (
    <>
      <div className="maincontainer">
        <div className="container">
          <div>
            <div className="heading">Enter Tag Of The Quote</div>
            <div>
              <select name="quote" onChange={onchange}>
                {tags.map((val) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="heading">Enter Tag Of The Image</div>
            <div>
              <input
                type="text"
                name="image"
                value={tag.image}
                onChange={onchange}
              />
            </div>
          </div>
        </div>
        <Radiocomp tag={tag} settag={settag} />
        <div>
          <button onClick={handleonclick} className="btn">
            Get
          </button>
        </div>

        <Imagecomponent tag={tag} />
      </div>
    </>
  );
}
