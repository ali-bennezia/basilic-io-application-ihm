import React from "react";

function Post({ postData }) {
  console.log(postData);
  return (
    <div
      className="inner-page-block"
      style={{ height: "auto", padding: "30px", marginTop: "-40px" }}
    >
      {postData.contenu}
    </div>
  );
}

export default Post;
