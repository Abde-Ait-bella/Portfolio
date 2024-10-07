import { React, useRef } from "react";
import { Link } from "react-router-dom";
import "./CSS/Projects.scss";
import { UseMode } from "./Context";


function Projects() {
  const {data} = UseMode();

  const videosRef = useRef([null, null, null]);
  const {mode} = UseMode();

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
    <div className="projects" theme-toggle-mode={mode}>
    <h3>My Projects</h3>
      <div className="grid-video">
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

export default Projects;
