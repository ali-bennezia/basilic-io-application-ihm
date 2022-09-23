import React, { useState } from "react";

import { EntypoCross } from "react-entypo";

function BoiteDialogue({ title, children, isOpen, setIsOpen, style = {} }) {
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
          width: "600px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "24px",
          ...style,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          {" "}
          <p
            style={{
              display: "inline-block",
              fontWeight: "bolder",
              fontSize: "22px",
              marginTop: "-8px",
            }}
          >
            {title}
          </p>
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

        <hr style={{ position: "relative", top: "-40px" }} />

        <div
          style={{
            width: "100%",
            height: "80%",
            marginTop: "-50px",
            padding: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default BoiteDialogue;
