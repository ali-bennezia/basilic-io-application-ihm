//React & routage
import React, { useContext, useState } from "react";

//Composantes packages
import { EntypoTrash } from "react-entypo";
import Button from "react-bootstrap/Button";
import BeatLoader from "react-spinners/BeatLoader";

//Contexte.
import AuthentificationContext from "../../../contexts/AuthentificationContext";

//Packagages & utilitaires.
import axios from "axios";

//Configuration.
import config from "./../../../config/config.json";

function PostSupprimerAction({
  postId,
  onDeleted,
  setSnackbarMessage,
  setSnackbarIsOpen,
}) {
  //Variables de contexte.
  const { authPayload } = useContext(AuthentificationContext);

  //Variables d'état.
  const [isFetching, setIsFetching] = useState(false);

  //Callbacks.
  const sendRemoveRequest = () => {
    if (isFetching === true) return;
    setIsFetching(true);
    axios
      .delete(`${config.applicationServerURL}posts/delete/${postId}`, {
        headers:
          authPayload != null && "token" in authPayload
            ? { authorization: `Bearer ${authPayload.token}` }
            : {},
      })
      .then((data) => {
        if (onDeleted != undefined && onDeleted != null) onDeleted(postId);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);

        if (setSnackbarIsOpen != undefined && setSnackbarIsOpen != undefined) {
          setSnackbarMessage("Suppression impossible.");
          setSnackbarIsOpen(true);
        }
      });
  };

  return (
    <>
      {isFetching ? (
        <div
          style={{
            marginRight: "16px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <BeatLoader color="green" />
        </div>
      ) : (
        <Button
          variant="warning"
          className={`${
            authPayload != null && authPayload.admin ? "text-selectable" : ""
          }`}
          style={{ marginRight: "16px", marginTop: "-2px" }}
          disabled={isFetching}
          onClick={sendRemoveRequest}
        >
          {" "}
          <EntypoTrash
            style={{ marginTop: "1px", marginRight: "4px", fontSize: "20px" }}
          />
          Supprimer
        </Button>
      )}
    </>
  );
}

export default PostSupprimerAction;
