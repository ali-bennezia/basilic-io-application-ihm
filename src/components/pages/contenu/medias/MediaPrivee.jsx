import React, { useRef, useContext, useState } from "react";

import Video from "./Video";
import config from "../../../../config/config.json";

import { EntypoVideo } from "react-entypo";
import { useEffect } from "react";
import AuthentificationContext from "../../../../contexts/AuthentificationContext";

const mediaAppearenceStyle = {
  boxShadow: "grey 0px 0px 3px",
};

const fetchPrivateMedia = (mediaName, token, successSetter, setURL) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  fetch(
    `${config.mediaServerURL}medias/private/get/${encodeURIComponent(
      "private/" + mediaName
    )}`,
    { headers }
  )
    .then(async (d) => {
      const b = await d.blob();
      setURL(URL.createObjectURL(b));
      successSetter(true);
    })
    .catch((err) => {
      successSetter(false);
    });
};

function MediaPrivee({
  isVideo = false,
  mediaName,
  style = {},
  isVideoThumbnail = true,
}) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [mURL, setmURL] = useState(""); //${config.mediaServerURL}medias/private/get/${mediaName}
  const [fetchSuccess, setFetchSuccess] = useState(false);

  //Ref.
  const mediaRef = useRef();

  //Init.
  useEffect(() => {
    fetchPrivateMedia(mediaName, authPayload.token, setFetchSuccess, setmURL);

    return () => {
      if (fetchSuccess) URL.revokeObjectURL(mURL);
    };
  }, []);

  return !isVideo ? (
    <img style={style} ref={mediaRef} src={mURL} />
  ) : !isVideoThumbnail ? (
    <Video
      options={{
        controls: true,
        sources: [
          {
            src: mURL,
            type: "video/mp4",
          },
        ],
      }}
      style={style}
    />
  ) : (
    <span>
      <video
        src={mURL}
        style={{ width: "100%", ...mediaAppearenceStyle, ...style }}
        ref={mediaRef}
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
  );
}

export default MediaPrivee;
