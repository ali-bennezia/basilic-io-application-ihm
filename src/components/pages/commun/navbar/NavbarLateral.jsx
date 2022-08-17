import React from "react";

import BlockCompte from "./BlockCompte";
import NavbarButtonSet from "./NavbarButtonSet";

export default function NavbarLateral() {
  return (
    <div className="navbar navbar-side">
      <BlockCompte />
      <NavbarButtonSet />
    </div>
  );
}
