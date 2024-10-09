import { useEffect, useRef, useState } from "react";
import { ReactImageTurntable } from "react-image-turntable";

const images = [
  "https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/001.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/002.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/003.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/004.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/005.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/006.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/007.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/008.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/009.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/010.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/011.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/012.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/013.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/014.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/015.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/016.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/017.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/018.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/019.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/020.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/021.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/022.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/023.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/024.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/025.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/026.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/027.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/028.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/029.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/030.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/031.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/032.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/033.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/034.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/035.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/036.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/037.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/038.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/039.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/040.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/041.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/042.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/043.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/044.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/045.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/046.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/047.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/048.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/049.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/050.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/051.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/052.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/053.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/054.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/055.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/056.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/057.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/058.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/059.jpg",
"https://cdn.webrotate360.com/sites/webrotate360/images/webrotate360/views/singlerow3d/images/060.jpg",
]

export default function ImageTurnable() {
  const [rotationDisabled, setRotationDisabled] = useState(false);
  const timeout = useRef(null);
  const handleKeyDown = (ev) => {
    if (rotationDisabled) return;

    if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
      setRotationDisabled(true);
    }
  };

  useEffect(() => {
    clearTimeout(timeout.current);
    if (rotationDisabled) {
      timeout.current = setTimeout(() => {
        setRotationDisabled(false);
        clearTimeout(timeout.current);
      }, 5000);
    }
  }, [rotationDisabled]);

  return (
      <ReactImageTurntable
      className="image-turnable"
        images={images}
        autoRotate={{ disabled: rotationDisabled, interval: 200 }}
        onPointerDown={() => setRotationDisabled(true)}
        onPointerUp={() => setRotationDisabled(true)}
        onKeyDown={handleKeyDown}
        onKeyUp={() => setRotationDisabled(true)}
        style={{ height: "100%" }}
      />
  );
}
