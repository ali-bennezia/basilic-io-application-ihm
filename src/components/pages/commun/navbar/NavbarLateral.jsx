import React from "react";
import { isUserAuthentified } from "./../../../../utils/authentification";
import AccountBlock from "./AccountBlock";

export default function NavbarLateral() {
  return (
    <div className="navbar navbar-side">
      <AccountBlock />
    </div>
  );
}
