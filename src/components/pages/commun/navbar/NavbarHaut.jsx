import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./../PagesCommun.css";
import "./Navbar.css";

function NavbarHaut() {
  //Variables d'état.
  const [searchInput, setSearchInput] = useState("");

  //Navigate.
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();

    navigate(`/recherche?r=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="navbar navbar-top">
      <span
        style={{
          height: "100%",
          width: "100%",
          display: "flex",

          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="/img/basilic_titre_mid_res.png"
          style={{
            maxHeight: "200%",
            marginLeft: "50px",
          }}
        />

        <div style={{ width: "64%", marginRight: "16%" }}>
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
            onSubmit={doSearch}
          >
            <Form.Control
              className="input-query"
              type="text"
              placeholder="Faire une recherche ..."
              value={searchInput}
              onInput={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <Form.Text />
            <Button
              variant="primary"
              className="button-query"
              onClick={doSearch}
            >
              Chercher
            </Button>
          </Form>
        </div>
      </span>
    </div>
  );
}

export default NavbarHaut;
