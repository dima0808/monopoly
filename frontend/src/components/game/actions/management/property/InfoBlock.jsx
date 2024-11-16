import {uniqueEffectsInfo} from "../../../../../constraints";
import {useState} from "react";

export default function InfoBlock({ info, isOpened = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(isOpened);

  return (
      <>
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            className="info-btn"
        >
          i
        </div>
        {(isHovered || isClicked) && <div className="info-block">
          {info.map((item, index) => (
              <div key={index}>
                {uniqueEffectsInfo[item].description}
              </div>
          ))}
        </div>}
      </>
  );
}