import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import { EntypoChat } from "react-entypo";
import SelectionneurMedias from "./medias/SelectionneurMedias";

function ChampPost({ setFormNotificationOpen, setFormNotificationMessage }) {
  const [medias, setMedias] = useState([]);
  return (
    <div
      className="inner-page-block"
      style={{ height: "auto", padding: "30px", marginTop: "0px" }}
    >
      <Form
        style={{
          width: "100%",
        }}
      >
        {" "}
        <Form.Control as="textarea" rows={4} placeholder="Discutez !" />{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button variant="primary" type="submit">
            <EntypoChat
              style={{ marginTop: "4px", marginRight: "6px", fontSize: "20px" }}
            />
            Poster
          </Button>
          <SelectionneurMedias
            setFormNotificationOpen={setFormNotificationOpen}
            setFormNotificationMessage={setFormNotificationMessage}
            medias={medias}
            setMedias={setMedias}
          />
        </div>
      </Form>
    </div>
  );
}

export default ChampPost;
