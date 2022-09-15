import React, { useRef, useEffect } from "react";

import videojs from "video.js";
import "video.js/dist/video-js.css";

function Video({ options }) {
  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <video
        id="my-video"
        className="video-js"
        controls
        preload="auto"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{'aspect-ratio':'16:9', 'fluid': true}"
        style={{ width: "100%", height: "100%" }}
      >
        <source src={options.sources[0].src} type="video/mp4" />
        <p class="vjs-no-js">
          Votre navigateur est incompatible. Vous ne pouvez pas visionner cette
          vidéo.
        </p>
      </video>
    </div>
  );
}

export default Video;
