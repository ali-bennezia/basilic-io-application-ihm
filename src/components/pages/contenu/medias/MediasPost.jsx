import React from "react";
import config from "./../../../../config/config.json";

function MediasPost({ medias = [] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      {medias.map((el, i) => {
        const mediaData = el.split("/");
        const mediaSource = `${config.mediaServerURL}medias/${mediaData[0]}/get/${mediaData[1]}`;
        const mediaStyle = {
          backgroundColor: "white",
          margin: "8px",
          width: medias.length == 1 ? "100%" : "40%",
        };

        return !el.endsWith(".mp4") ? (
          <img key={i} style={mediaStyle} src={mediaSource} />
        ) : (
          <video key={i} style={mediaStyle} src={mediaSource} />
        );
      })}
    </div>
  );
}

export default MediasPost;
