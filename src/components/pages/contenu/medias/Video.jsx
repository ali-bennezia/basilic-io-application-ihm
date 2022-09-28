import React, { useRef, useEffect } from "react";
import "video-react/dist/video-react.css";

import { Player } from "video-react";

function Video({ options }) {
  console.log(Player);
  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <Player
        src={options.sources[0].src}
        style={{ width: "100%", height: "100%" }}
        width="100%"
        height="100%"
        fluid={false}
      />
    </div>
  );
}

export default Video;
