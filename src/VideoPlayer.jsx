import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";
import axios from 'axios';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {

   

        const player = dashjs.MediaPlayer().create();

        

        player.initialize(videoRef.current, 'http://127.0.0.1:8888/stream', true);
    
       
 
   


 
    }
  }, []);

  const initDash = async () => {
    if (videoRef.current) {

      axios.get('http://127.0.0.1:8888/stream')
      .then(response => {

        const player = dashjs.MediaPlayer().create();
        player.initialize(videoRef.current, response.data, true);
     
      })
      .catch(error => {
        console.error('Error fetching MPD:', error);
      });


 
    }
  };
  const getStream = async () => {
    const content =  await fetch("http://127.0.0.1:8888/stream");
    console.log(content)
    return content;
   };

  return <video ref={videoRef} controls />;
};

export default VideoPlayer;
