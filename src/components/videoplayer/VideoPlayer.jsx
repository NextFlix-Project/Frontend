import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";
import axios from "axios";

const VideoPlayer = (props) => {
  let videoRef = useRef(null);
  let player = null;

  useEffect(() => {
    if (videoRef.current) {
      player = dashjs.MediaPlayer().create();
      player.updateSettings({
        debug: { logLevel: dashjs.Debug.LOG_LEVEL_DEBUG },
      });

      try {
        player.initialize(videoRef.current, props.movie.url, true);
      } catch (e) {
        console.log(e.message);
      }
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      controls
      style={{ width: "99vw", height: "100vh" }}
    />
  );
};

export default VideoPlayer;
