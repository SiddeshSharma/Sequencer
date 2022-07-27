import React from "react";

export default function SingleVideoBar({ eachVideo, handleTimeLineSeek }) {
  return (
    <div
      style={{
        width: eachVideo.duration - 2 + "px",
        height: "25px",
        backgroundColor: "#FF5959",
        border: "1px solid black",
      }}
      onClick={(event) =>
        handleTimeLineSeek({ video: eachVideo, duration: event.pageX })
      }
    >
      <span>{eachVideo.title}</span>
    </div>
  );
}
