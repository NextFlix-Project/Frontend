import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/videoplayer/VideoPlayer";

function VideoPage() {
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .post(
        process.env.server_base + "/api/v1/movie/streammovie",
        { id: location.state.id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setMovie({
          title: location.state.title,
          description: location.state.description,
          url: response.data,
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const renderVideo = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "99vw",
          height: "100vh",
          position: "absolute",
          objectFit: "cover",
          marginTop: "0px",
          top: "50%",
          left: "50%",

          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          style={{
            width: "99vw",
            height: "100vh",
            position: "absolute",
            objectFit: "cover",
            marginTop: "0px",
            top: "50%",
            left: "50%",

            transform: "translate(-50%,-50%)",
          }}
        >
          <VideoPlayer movie={movie} />

          <div>
            <div>{movie.title} </div>
            <div>{movie.description} </div>
          </div>
        </div>
      </div>
    );
  };

  if (movie !== null) return renderVideo();
}

export default VideoPage;
