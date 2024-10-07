import React, { useRef, useEffect } from "react";
import "./CSS/Home.scss";
import { Link } from "react-router-dom";
import { UseMode } from "./Context";

function Home() {
  const {data} = UseMode();

  const videoRefHome = useRef();
  const videosRef = useRef([null, null, null]);
  const {mode} = UseMode();

  useEffect(() => {
    if (videoRefHome.current) {
      videoRefHome.current.muted = true;
      videoRefHome.current.play().catch((error) => {
        console.error("Failed to autoplay video:", error);
      });
      setTimeout(() => {
        // videoRefHome.current.muted = false;
      }, 1000);
    }

  }, []);

  const StartVideo = (index) => {
    if (videosRef.current[index]) {
      videosRef.current.forEach((ref, i) => {
        if (i != index && ref) {
          ref?.pause();
        }
      });

      const videoElement = videosRef.current[index];
      if (videoElement) {
        videoElement?.play().catch((error) => {
          console.error("Failed to play video:", error);
        });
      }
    }
  };

  const PausVideo = (index) => {
    if (videosRef.current[index]) {
      videosRef?.current[index]?.pause();
    }
  };

  return (
    <div className="home" 
    theme-toggle-mode={mode}  
    >
      <div className="home-present">
        <div className="video">
          <video
            src="assets/videos/home-video.m4v"
            ref={videoRefHome}
            width="376"
            height="212"
            autoPlay
            controls
          />
        </div>
        <div className="video-info">
          <p className="title">Hello world !</p>
          <p className="statistic">9,538 views 2 years ago</p>
          <p className="description">
            Hello! I'm junior developper, a passionate front-end developer dedicated
            to crafting beautiful and functional web experiences. Explore my
            projects, learn more about my skills, and feel free to get in touch!
          </p>
        </div>
      </div>
      <hr />
      <div className="grid-video">
        <h5>For You</h5>
        <div className="videos">
          {data.map((d, index) => (
            <Link to={`/show/${d.id}`}>
              <div className="video">
                <video
                  src={d.src}
                  ref={(el) => (videosRef.current[index] = el)}
                  width="353"
                  height="199"
                  onMouseMove={() => StartVideo(d.id)}
                  onMouseOut={() => PausVideo(d.id)}
                />
                <div className="video-info">
                  <p className="title">{d.title}</p>
                  <p className="statistic">{d.info}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
