import React from "react";

import AccountBlock from "./AccountBlock";
import NavbarButtonSet from "./NavbarButtonSet";

export default function NavbarLateral() {
  return (
    <div className="navbar navbar-side">
      <AccountBlock />
      <NavbarButtonSet />
    </div>
  );
}
