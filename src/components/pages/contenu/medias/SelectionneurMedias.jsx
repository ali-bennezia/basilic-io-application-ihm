import React from "react";

import Button from "react-bootstrap/Button";

import { EntypoCircleWithPlus } from "react-entypo";

function SelectionneurMedias() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "200px",
      }}
    >
      <Button style={{ marginLeft: "8px" }}>
        {" "}
        <EntypoCircleWithPlus
          style={{ marginTop: "2px", marginRight: "6px", fontSize: "22px" }}
        />
        Ajouter un média
      </Button>
    </div>
  );
}

export default SelectionneurMedias;
