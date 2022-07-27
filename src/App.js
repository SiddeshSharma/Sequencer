import { useEffect, useState } from "react";
import { videoSrc } from "./API";
import "./App.css";
import TimeLine from "./component/TimeLine";
import Videoplayer from "./component/Videoplayer";

//update src
//update time
//

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState(videoSrc[0]);

  //timelineStates
  const [globalTime, setGlobalTime] = useState(0);
  const [timeLineSeek, setTimeLineSeek] = useState({ video: {}, duration: "" });

  function updateSrc(globalTime) {
    // check which videoFits in globalTime
    // update the element src and current time based on it.
  }

  function handleVideoProgress({ videoId, localTime }) {
    setGlobalTime(videoSrc[videoId].start + localTime);
  }

  function handleVideoEnd(video) {
    setCurrentVideoPlaying(videoSrc[video.index + 1]);
  }

  return (
    <div className="App">
      <div>
        <Videoplayer
          currentVideoToPlay={currentVideoPlaying}
          nextVideoToPlay={videoSrc[currentVideoPlaying.index + 1]}
          onVideoEnd={handleVideoEnd}
          onCurrentTimeUpdate={(time) => {
            handleVideoProgress({
              videoId: currentVideoPlaying.index,
              localTime: time,
            });
          }}
          isPaused={isPaused}
          timeLineSeek={timeLineSeek}
        />
      </div>
      <div>
        {/* whenever changed via bar should return video and time seeked */}
        <TimeLine
          globalTime={globalTime}
          handleTimeLineSeek={(result) => {
            if (currentVideoPlaying.index === result.video.index) {
              setTimeLineSeek(result);
            }else{
              setCurrentVideoPlaying(result.video)
              setTimeLineSeek(result);
            }
          }}
        />
      </div>
      <div>
        <button onClick={() => setIsPaused(!isPaused)}>play/pause</button>
        <button
          onClick={() =>
            setCurrentVideoPlaying(videoSrc[currentVideoPlaying.index + 1])
          }
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
