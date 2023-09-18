import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";
import axios from "axios";

const VideoPlayer = (props) => {
  let videoRef = useRef(null);
  let player = null;

  useEffect(() => {
    if (videoRef.current) {
      player = dashjs.MediaPlayer().create();

      player.initialize(videoRef.current, props.movie.url, true);
    }

  
  }, []);

 

  return (
    <video ref={videoRef} autoPlay controls style={{ width: "99vw", height: "100vh" }} />
  );
};

export default VideoPlayer;
