import React from "react";

function DescriptionProfil({ profile, style }) {
  return (
    <p
      style={{
        width: "280px",
        height: "100px",
        wordWrap: "break-word",
        overflow: "hidden",
        ...style,
      }}
    >
      {profile != null && "descriptionProfil" in profile
        ? profile.descriptionProfil
        : ""}
    </p>
  );
}

export default DescriptionProfil;
