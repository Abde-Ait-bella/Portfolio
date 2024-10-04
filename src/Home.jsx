import React, { useRef, useEffect } from "react";
import "./CSS/Home.scss";
import { Link } from "react-router-dom";

function Home() {
  const data = [
    {
      id: 0,
      src: "./assets/videos/video.mp4",
      title: "Football Referees' Administrative Match Questions Management Application .",
      info: "9,538 views 2 years ago",
      description:
        "This application is designed to help football referees in managing match-related administrative matters efficiently. It provides a central platform where referees can record various administrative aspects of the match report and track match statistics, and even enable them to save all match reports and even print them in PDF format. \n Key Features \n Match Information Recording: Allows referees to input essential details such as date, time, stade, and competing teams etc ....\n Data Management: Facilitates adding, modifying, and removing (assistant referees, clubs, stades, cities ...).\n Match statistics: The number of matches in months and years, the number of warnings, charts.\n Reports: Generates detailed report and information about the matches and events that took place during the matches will be issued in the form of an official report that will be sent to the regional league....\n Print the report: The site provides the feature of printing the report and downloading it in a format PDF."
    },
    {
      id: 1,
      src: "./assets/videos/video1.mp4",
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

  const videoRefHome = useRef();
  const videosRef = useRef([null, null, null]);

  useEffect(() => {
    if (videoRefHome.current) {
      videoRefHome.current.muted = true;
      videoRefHome.current.play().catch((error) => {
        console.error("Failed to autoplay video:", error);
      });
      setTimeout(() => {
        videoRefHome.current.muted = false;
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
    <div className="home">
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
