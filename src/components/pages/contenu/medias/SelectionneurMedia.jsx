import React from "react";

function SelectionneurMedia({ file }) {
  const url = URL.createObjectURL(file);
  return (
    <div style={{ padding: "10px" }}>
      {file.type.includes("video") ? (
        <video src={url} style={{ maxHeight: "68px" }} alt="média" />
      ) : (
        <img src={url} style={{ maxHeight: "68px" }} alt="média" />
      )}
    </div>
  );
}

export default SelectionneurMedia;
