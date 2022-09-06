import React from "react";

import Button from "react-bootstrap/Button";
import { EntypoTrash } from "react-entypo";

function SelectionneurMedia({ file, removeFile }) {
  const url = URL.createObjectURL(file);

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {file.type.includes("video") ? (
        <video
          src={url}
          style={{ maxHeight: "68px", borderRadius: "15px" }}
          alt="média"
        />
      ) : (
        <img
          src={url}
          style={{ maxHeight: "68px", borderRadius: "15px" }}
          alt="média"
        />
      )}
      <button
        className="media-delete-btn"
        style={{ border: "none" }}
        onClick={(e) => {
          e.preventDefault();
          removeFile(file);
        }}
      >
        <EntypoTrash
          style={{ fontSize: "20px", marginTop: "10px", padding: "0px" }}
        />
      </button>
    </div>
  );
}

export default SelectionneurMedia;
