import React from "react";

import { EntypoThumbsUp, EntypoThumbsDown } from "react-entypo";

const textStyle = { display: "inline-block", fontWeight: "bold" };
const iconStyle = {
  fontSize: "26px",
  marginTop: "-4px",
  marginLeft: "6px",
  marginRight: "6px",
};

function BlockInteractionsPost({ postData, style }) {
  postData.dislike = 24;
  postData.like = 25;
  return (
    <div style={style}>
      <EntypoThumbsDown style={iconStyle} />
      <p style={textStyle}>{postData.dislike}</p>
      <div
        style={{
          display: "inline-block",
          width: "120px",
          height: "8px",
          position: "relative",
          top: "-1px",
          marginLeft: "10px",
          marginRight: "10px",

          background: "rgb(237,237,237)",
          background:
            "linear-gradient(180deg, rgba(227,227,227,1) 0%, rgba(189,189,189,1) 100%)",
        }}
      >
        <div
          style={{
            height: "100%",

            width: `${parseInt(
              (postData.dislike / (postData.like + postData.dislike)) * 100
            )}%`,
            position: "relative",
            top: "0px",

            background: "rgb(116,0,0)",
            background:
              "linear-gradient(0deg, rgba(116,0,0,1) 0%, rgba(255,0,0,1) 100%)",
          }}
          hidden={
            postData == null || (postData.like === 0 && postData.dislike === 0)
          }
        />
        <div
          style={{
            height: "100%",
            width: `${parseInt(
              (postData.like / (postData.like + postData.dislike)) * 100
            )}%`,
            position: "relative",
            top: "-100%",
            float: "right",

            background: "rgb(0,143,5)",
            background:
              "linear-gradient(0deg, rgba(0,143,5,1) 0%, rgba(0,251,75,1) 100%)",
          }}
          hidden={
            postData == null || (postData.like === 0 && postData.dislike === 0)
          }
        />
      </div>
      <p style={textStyle}>{postData.like}</p>
      <EntypoThumbsUp style={iconStyle} />
    </div>
  );
}

export default BlockInteractionsPost;
