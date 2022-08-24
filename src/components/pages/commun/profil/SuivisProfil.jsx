import React from "react";
import { EntypoHeart, EntypoUsers } from "react-entypo";

function SuivisProfil({ profile, style }) {
  const suis = profile != null && "suis" in profile ? profile.suis : null;
  const suiviPar =
    profile != null && "suiviPar" in profile ? profile.suiviPar : null;

  return profile != null && suis != null && suiviPar != null ? (
    <div style={{ ...style, width: "auto" }}>
      <p
        style={{
          textAlign: "right",
          fontFamily: "1.2em Fira Sans, sans-serif",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <EntypoHeart style={{ verticalAlign: "middle", fontSize: "30px" }} />{" "}
        Suis {suis.toString()} &nbsp;&nbsp;
        <EntypoUsers
          style={{ verticalAlign: "middle", fontSize: "30px" }}
        />{" "}
        Suivi par {suiviPar.toString()}
      </p>
    </div>
  ) : (
    <></>
  );
}

export default SuivisProfil;
