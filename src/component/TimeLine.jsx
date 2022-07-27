import React from "react";
import { videoSrc } from "../API";
import SingleVideoBar from "./SingleVideoBar";

export default function TimeLine({ globalTime, handleTimeLineSeek }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          height: "200px",
          width: "100vw",
          backgroundColor: "#1B1D28",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            height: "25px",
          }}
        >
          <span>duration: {globalTime}</span>
        </div>
        <div></div>
        <div></div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {videoSrc.map((eachVideo) => (
            <SingleVideoBar
              eachVideo={eachVideo}
              handleTimeLineSeek={handleTimeLineSeek}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            height: "25px",
            width: "1px",
            backgroundColor: "blue",
            top: "25px",
            left: globalTime + "px",
          }}
        ></div>
      </div>
    </>
  );
}
