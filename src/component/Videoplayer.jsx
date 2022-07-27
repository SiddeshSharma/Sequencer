import React, { useEffect, useRef, useState } from "react";
import { elementToCastOn } from "../utils";

export default function Videoplayer({
  currentVideoToPlay,
  nextVideoToPlay,
  onVideoEnd,
  onCurrentTimeUpdate,
  isPaused,
  timeLineSeek,
}) {
  const element1 = useRef(null);
  const element2 = useRef(null);
  const [currentActiveElement, setCurrentActiveElement] = useState("1");

  function updateSrcOfElement(elementId) {
    if (elementId === "1" && currentActiveElement === "1") {
      element1.current.pause();
      element1.current.src = currentVideoToPlay.sources;
      element1.current.play();
      element2.current.src = nextVideoToPlay.sources;
      return;
    }
    if (elementId === "2" && currentActiveElement === "2") {
      element2.current.pause();
      element2.current.src = currentVideoToPlay.sources;
      console.log("playing vid 2");
      element2.current.play();
      element1.current.src = nextVideoToPlay.sources;
      return;
    }
    if (elementId === "1") {
      element1.current.src = currentVideoToPlay.sources;
      element1.current.play();
      return;
    }
    if (elementId === "2") {
      element2.current.src = currentVideoToPlay.sources;
      element2.current.play();
      return;
    }
  }

  function updateDurationOfElement(duration) {
    if (currentActiveElement === "1") {
      element1.current.currentTime = duration;
    } else {
      element2.current.currentTime = duration;
    }
  }

  function initOnVideoEnd() {
    if (element1 && element2) {
      // check for smooth toogling
      element1.current.onended = function (event) {
        console.log("vidsndiw");
        onVideoEnd(currentVideoToPlay);
      };
      element2.current.onended = function (event) {
        onVideoEnd(currentVideoToPlay);
      };
    }
  }
  if (element1.current && element2.current) {
    element1.current.ontimeupdate = function (event) {
      if (event.target.currentTime <= currentVideoToPlay.duration) {
        onCurrentTimeUpdate(Math.floor(event.target.currentTime));
      }
    };
    element2.current.ontimeupdate = function (event) {
      if (event.target.currentTime <= currentVideoToPlay.duration) {
        onCurrentTimeUpdate(Math.floor(event.target.currentTime));
      }
    };
  }
  useEffect(() => {
    //initially
    if (currentVideoToPlay) {
      let result = elementToCastOn(currentVideoToPlay.index);
      //initalize video src load
      updateSrcOfElement(result);
      setCurrentActiveElement(result);
      initOnVideoEnd();
    }
  }, [currentVideoToPlay]);

  useEffect(() => {
    // if paused
    // if seeked via timeline
    if (isPaused) {
      currentActiveElement === "1"
        ? element1.current.pause()
        : element2.current.pause();
    } else {
      currentActiveElement === "1"
        ? element1.current.play()
        : element2.current.play();
    }
  }, [isPaused]);

  useEffect(() => {
    if (timeLineSeek.duration <= currentVideoToPlay.duration) {
      updateDurationOfElement(timeLineSeek.duration);
    }
    console.log("timelineseek", timeLineSeek);
  }, [timeLineSeek]);

  return (
    <>
      <div>Videoplayer</div>
      <span>Playing: {currentVideoToPlay.title}</span>

      <video
        ref={element1}
        height={400}
        width={600}
        style={{
          position: "absolute",
          right: "40px",
          top: "100px",
          display: currentActiveElement === "1" ? "block" : "none",
        }}
      />
      <video
        ref={element2}
        height={400}
        width={600}
        style={{
          position: "absolute",
          right: "40px",
          top: "100px",
          display: currentActiveElement === "2" ? "block" : "none",
        }}
      />
    </>
  );
}
