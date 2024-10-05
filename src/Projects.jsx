import { React, useRef } from "react";
import { Link } from "react-router-dom";
import "./CSS/Projects.scss";
import { UseMode } from "./Context";


function Projects() {
  const data = [
    {
      id: 0,
      src: "/assets/videos/video.mp4",
      title: "Lorem ipsum dolor sit amet.",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 1,
      src: "/assets/videos/video1.mp4",
      title: "Lorem ipsum dolor sit amet.",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 2,
      src: "/assets/videos/video2.mp4",
      title: "Zizou binse (Official Clip).",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 3,
      src: "/assets/videos/First Potty Accident.mp4",
      title: "First Potty Accident",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 4,
      src: "/assets/videos/video.m4v",
      title: "Vlog Trip",
      info: "9,538 views 3 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 5,
      src: "/assets/videos/First Time I Didn't Want to Tell the Truth.mp4",
      title: "First Time I Didn't Want to Tell the Truth",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
    {
      id: 6,
      src: "/assets/videos/Tchubi.mp4",
      title: "Tchubi.mp4",
      info: "9,538 views 2 years ago",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
    },
  ];

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
