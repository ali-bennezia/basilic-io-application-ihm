import React, { createRef, useState } from "react";

import Button from "react-bootstrap/Button";

import { EntypoCircleWithPlus } from "react-entypo";
import SelectionneurMedia from "./SelectionneurMedia";
import config from "./../../../../config/config.json";

function SelectionneurMedias({
  setFormNotificationOpen,
  setFormNotificationMessage,
}) {
  const fileInputRef = createRef();

  //Variables d'état.
  const [medias, setMedias] = useState([]);

  //Callbacks
  const fetchMedias = (e) => {
    e.preventDefault();
    let arr = [];
    for (let file of fileInputRef.current.files) arr.push(file);
    setMedias((val) => [...val, ...arr]);

    console.log(medias);
  };

  const removeFile = (file) => {
    let arr = [...medias];
    arr.splice(arr.indexOf(file), 1);
    setMedias(arr);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "auto",
      }}
    >
      <input
        type="file"
        id=""
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/png, image/jpeg, video/mp4"
        onChange={fetchMedias}
      />
      <Button
        style={{ marginLeft: "8px" }}
        onClick={(e) => {
          e.preventDefault();

          if (medias.length >= config.maxMediasPerPost) {
            if (
              setFormNotificationOpen != undefined &&
              setFormNotificationMessage != undefined
            ) {
              setFormNotificationMessage(
                "Limite de médias possibles atteinte."
              );
              setFormNotificationOpen(true);
            }

            return;
          }

          fileInputRef.current.click();
        }}
      >
        {" "}
        <EntypoCircleWithPlus
          style={{ marginTop: "2px", marginRight: "6px", fontSize: "22px" }}
        />
        Ajouter un média
      </Button>

      <div
        style={{
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {medias.map((el, i) => {
          return (
            <SelectionneurMedia file={el} key={i} removeFile={removeFile} />
          );
        })}
      </div>
    </div>
  );
}

export default SelectionneurMedias;
