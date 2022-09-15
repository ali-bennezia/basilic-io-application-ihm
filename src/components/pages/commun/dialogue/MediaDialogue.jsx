import React, { useState, useRef, useEffect } from "react";
import Video from "./../../contenu/medias/Video";

import { EntypoCross } from "react-entypo";
import MoonLoader from "react-spinners/MoonLoader";

const isMediaLoaded = (ref) => {
  if (ref.current == null || ref.current == undefined) return true;
  if ("complete" in ref.current && ref.current.complete === false) return false;
  if ("naturalWidth" in ref.current && ref.current.naturalWidth === 0)
    return false;
  if ("readyState" in ref.current && ref.current.readyState !== 4) return false;
  return true;
};

function MediaDialogue({ isVideo = false, src, isOpen, setIsOpen }) {
  //Constantes.
  const mediaStyle = { maxWidth: "80vw", maxHeight: "80vh" };
  const mediaRef = useRef();

  //Variables d'état.
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(src);

  //Effets.
  useEffect(() => {
    setIsLoaded(isMediaLoaded(mediaRef));
  });

  return isOpen ? (
    <div
      style={{
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100vw",
        height: "100vh",
        zIndex: "10",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(214, 214, 214, 0.15)",
      }}
    >
      <div
        style={{
          width: "auto",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "30px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <button
            style={{ border: "none", background: "none" }}
            onClick={(e) => {
              setIsOpen(false);
            }}
          >
            {" "}
            <EntypoCross
              style={{
                fontSize: "28px",
                marginTop: "-12px",
                marginRight: "-12px",
              }}
            />{" "}
          </button>
        </div>

        {src != null ? (
          <>
            {isVideo ? (
              <Video
                options={{
                  controls: true,
                  sources: [{ src: src, type: "video/mp4" }],
                }}
              />
            ) : (
              <img
                style={mediaStyle}
                src={src}
                ref={mediaRef}
                hidden={!isLoaded}
              />
            )}
            <MoonLoader color="green" hidden={isLoaded} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default MediaDialogue;
