import React, { useContext, useRef } from "react";

import axios from "axios";
import config from "./../../../../config/config.json";

import { EntypoVideo } from "react-entypo";
import AuthentificationContext from "../../../../contexts/AuthentificationContext";
import MediaPrivee from "./MediaPrivee";

function MediasPost({
  medias = [],
  setMediaDialogueIsOpen,
  setMediaDialogueSource,
  setMediaDialogueIsVideo,
  setMediaDialogueIsPrivate = (b) => {},
  style = {},
}) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {medias.map((el, i) => {
        const mediaData = el.split("/");
        const mediaSource = `${config.mediaServerURL}medias/${mediaData[0]}/get/${mediaData[1]}`;
        const mediaPlacementStyle = {
          width: medias.length == 1 ? "100%" : "46%",
          marginTop: "20px",

          position: "relative",
          border: "none",
          padding: "0",
        };
        const mediaAppearenceStyle = {
          backgroundColor: "white",
          boxShadow: "grey 0px 0px 3px",
        };

        return !el.endsWith(".mp4") ? (
          <button
            key={i}
            style={{ ...mediaPlacementStyle, height: "auto" }}
            onClick={(e) => {
              e.preventDefault();
              setMediaDialogueSource(mediaSource);
              setMediaDialogueIsVideo(false);
              setMediaDialogueIsOpen(true);
              setMediaDialogueIsPrivate(mediaData[0] === "private");
            }}
          >
            {mediaData[0] === "private" ? (
              <MediaPrivee
                isVideo={false}
                mediaName={mediaData[1]}
                key={i}
                style={{
                  width: "100%",
                  margin: "0",
                  float: "top",
                  ...mediaAppearenceStyle,
                }}
              />
            ) : (
              <img
                key={i}
                style={{
                  width: "100%",
                  margin: "0",
                  float: "top",
                  ...mediaAppearenceStyle,
                }}
                src={mediaData[0] === "public" ? mediaSource : ""}
              />
            )}
          </button>
        ) : (
          <button
            key={i}
            style={{ ...mediaPlacementStyle }}
            onClick={(e) => {
              e.preventDefault();
              setMediaDialogueSource(mediaSource);
              setMediaDialogueIsVideo(true);
              setMediaDialogueIsOpen(true);
              setMediaDialogueIsPrivate(mediaData[0] === "private");
            }}
          >
            {mediaData[0] === "private" ? (
              <MediaPrivee
                isVideo={true}
                mediaName={mediaData[1]}
                key={i}
                style={{ width: "100%", ...mediaAppearenceStyle }}
              />
            ) : (
              <span>
                <video
                  src={mediaData[0] === "public" ? mediaSource : ""}
                  style={{ width: "100%", ...mediaAppearenceStyle }}
                />
                <div
                  style={{
                    position: "absolute",

                    top: "0px",
                    left: "0px",

                    width: "100%",
                    height: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EntypoVideo
                    style={{
                      fontSize: "100px",
                      color: "white",
                      filter: "drop-shadow(black 0px 0px 3px)",
                    }}
                  />
                </div>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default MediasPost;
