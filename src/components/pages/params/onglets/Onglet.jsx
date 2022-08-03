import React from "react";

function Onglet({ tabIndex, tabPosition, children, style = {} }) {
  return tabIndex == tabPosition ? (
    <div className="onglet-param" style={style}>
      {children}
    </div>
  ) : (
    <></>
  );
}

export default Onglet;
