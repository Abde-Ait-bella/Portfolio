import Nav from "./Nav";
import { useEffect, useState } from "react";
import "./CSS/Show.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as AWS from "aws-sdk";
import Swal from "sweetalert2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { UseMode } from "./Context";

function Show() {
  const { id } = useParams();
  const {mode} = UseMode();

  const [dataCommant, setDataCommant] = useState();
  const [curentTime, setCurentTime] = useState("00:00");
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    comment: "",
    project_id: null,
  });
  var isScrubbing = false;
  var wasPaused = false;

  const data = [
    {
      id: 0,
      src: "./assets/videos/video.mp4",
      title:
        "Football Referees' Administrative Match Questions Management Application .",
      info: "9,538 views 2 years ago",
      description:
        "This application is designed to help football referees in managing match-related administrative matters efficiently. It provides a central platform where referees can record various administrative aspects of the match report and track match statistics, and even enable them to save all match reports and even print them in PDF format. \n Key Features \n Match Information Recording: Allows referees to input essential details such as date, time, stade, and competing teams etc ....\n Data Management: Facilitates adding, modifying, and removing (assistant referees, clubs, stades, cities ...).\n Match statistics: The number of matches in months and years, the number of warnings, charts.\n Reports: Generates detailed report and information about the matches and events that took place during the matches will be issued in the form of an official report that will be sent to the regional league....\n Print the report: The site provides the feature of printing the report and downloading it in a format PDF.",
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

  useEffect(() => {
    AWS.config.update({
      region: "us-east-1", // Replace with your AWS region
      // endpoint: "dynamodb.us-east-1.amazonaws.com",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
      secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    });

    const dbClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: "comments",
    };

    dbClient.scan(params, function (err, data) {
      if (err) {
        console.log("Error scanning DynamoDB table: ", err);
        // setLoading(false)
      } else {
        setDataCommant(data.Items.filter((i) => i.project_id == id));
        setLoading(false)
      }
    });

    setComment((prevState) => ({
      ...prevState,
      name: "",
      comment: "",
      project_id: "",
    }));
  }, [id]);

  const video = data.find((d) => d.id == id);
  const videosOther = data.filter((d) => d.id != id);

  const videoRef = useRef();
  const videosRef = useRef([null, null, null]);
  const timelinContainerRef = useRef();
  const indicatorRef = useRef();
  const timelineRef = useRef();
  const videoContainerRef = useRef();
  const timelineImgRef = useRef();

  const [state, setState] = useState({
    clicked: true,
    theater: null,
    agine: null,
    volume: true,
    totalTime: "",
    rateVideo: 1,
    toggleMaxHeight: false,
    comment: "",
  });

  console.log(comment?.project_id == id);

  const videoClicking = () => {
    if (videoRef.current?.paused) {
      setState((prevState) => ({
        ...prevState,
        agine: false,
      }));
    }
    setState((prevState) => ({
      ...prevState,
      clicked: !state.clicked,
    }));

    if (state.clicked == true && videoRef.current) {
      videoRef.current?.play().catch((error) => {
        console.error("Failed to autoplay video:", error);
      });
    }
    if (state.clicked == false && videoRef.current) {
      videoRef.current?.pause();
    }
  };

  const toggleTheaters = () => {
    setState((prev) => ({
      ...prev,
      theater: !state.theater,
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const hoverStartVideo = (index) => {
    console.log(index);
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

  const hoverPausVideo = (index) => {
    if (videosRef.current[index]) {
      videosRef?.current[index]?.pause();
    }
  };

  const toggleVolume = () => {
    if (videoRef.current.volume) {
      videoRef.current.volume = 0;

      setState((prev) => ({
        ...prev,
        volume: false,
      }));
    } else {
      console.log("videoRef.current.volume", state.volume);
      videoRef.current.volume = true;
      setState((prev) => ({
        ...prev,
        volume: "high",
      }));
    }
  };

  const handlevolume = (e) => {
    if (e.target) {
      if (videoRef.current) {
        const volume = (videoRef.current.volume = e.target.value);
        sondManagement(volume);
      }
    }
  };

  const incvolume = (inc) => {
    if (videoRef.current.volume <= 0.6) {
      console.log(videoRef.current.volume);
      const volume = (videoRef.current.volume += inc);
      sondManagement(volume);
    } else {
      const volume = (videoRef.current.volume = 1);
      sondManagement(volume);
    }
  };

  const Lackvolume = (lack) => {
    if (videoRef.current.volume > 0.4) {
      const volume = (videoRef.current.volume += lack);
      console.log(volume);
      sondManagement(volume);
    } else {
      const volume = (videoRef.current.volume = 0);
      sondManagement(volume);
    }
  };

  const sondManagement = (volume) => {
    if (volume <= 0.5) {
      setState((prev) => ({
        ...prev,
        volume: "low",
      }));
    }
    if (volume >= 0.5) {
      setState((prev) => ({
        ...prev,
        volume: "high",
      }));
    } else if (volume == 0) {
      setState((prev) => ({
        ...prev,
        volume: false,
      }));
    }
  };

  const ended = () => {
    setState((prev) => ({
      ...prev,
      agine: true,
      clicked: true,
    }));
  };

  const keyDown = async (e) => {
    console.log(e.key);
    switch (e.key) {
      case "f":
        toggleFullscreen();
        break;
      case "t":
        toggleTheaters();
        break;
      case " ":
        videoClicking();
        break;
      case "m":
        toggleVolume();
        break;
      case "j":
      case "ArrowRight":
        skip(5);
        break;
      case "ArrowLeft":
        skip(-5);
        break;
      case "ArrowUp":
        incvolume(0.2);
        break;
      case "ArrowDown":
        Lackvolume(-0.2);
        break;
      default:
        break;
    }
  };

  const handleTotalTime = () => {
    const padNumber = (num) => (num < 10 ? `0${num}` : num);

    if (Math.floor(videoRef.current?.duration / 3600) == 0) {
      setState((prev) => ({
        ...prev,
        totalTime: `${padNumber(
          Math.floor((videoRef.current?.duration % 3600) / 60)
        )} : ${padNumber(Math.floor(videoRef.current?.duration % 60))}`,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        totalTime: `${padNumber(
          Math.floor(videoRef.current?.duration / 3600)
        )} : ${padNumber(
          Math.floor((videoRef.current?.duration % 3600) / 60)
        )} : ${padNumber(Math.floor(videoRef.current?.duration % 60))}`,
      }));
    }
  };

  const handleTimeUpdate = () => {
    const padNumber = (num) => (num < 10 ? `0${num}` : num);

    if (Math.floor(videoRef.current?.currentTime / 3600) == 0) {
      setCurentTime(
        `${padNumber(
          Math.floor((videoRef.current?.currentTime % 3600) / 60)
        )} : ${padNumber(Math.floor(videoRef.current?.currentTime % 60))}`
      );
    } else {
      setCurentTime(
        `${padNumber(
          Math.floor(videoRef.current?.currentTime / 3600)
        )} : ${padNumber(
          Math.floor((videoRef.current?.currentTime % 3600) / 60)
        )} : ${padNumber(Math.floor(videoRef.current?.currentTime % 60))}`
      );
    }

    const percent = videoRef.current?.currentTime / videoRef.current.duration;
    timelinContainerRef.current.style.setProperty(
      "--preview-progress",
      percent
    );
    indicatorRef.current.style.setProperty("--preview-progress", percent);
    timelineRef.current.style.setProperty("--preview-progress", percent);
  };

  const skip = (dur) => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + dur,
      videoRef.current.duration
    );
  };

  const ratechange = () => {
    if (videoRef.current.playbackRate === 2) {
      videoRef.current.playbackRate = 0.25;
    } else {
      videoRef.current.playbackRate += 0.25;
    }
    setState((prev) => ({
      ...prev,
      rateVideo: videoRef.current.playbackRate,
    }));
  };

  const handleTimelineUpdate = (e) => {
    const timelinContainerPS =
      timelinContainerRef.current.getBoundingClientRect();
    const timelinContainerX = Math.floor(timelinContainerPS.x);

    const percent =
      Math.min(
        Math.max(e.clientX - timelinContainerX, 0),
        timelinContainerPS.width
      ) / timelinContainerPS.width;

    const previewImgNumber = Math.max(
      1,
      Math.floor((percent * videoRef.current.duration) / 5)
    );

    setState((prev) => ({
      ...prev,
      sourcePreviewImg: `/assets/images/video${id}/img${previewImgNumber}.jpg`,
    }));

    console.log("source", state.sourcePreviewImg);
    timelineRef.current.style.setProperty("--preview-position", percent);
    timelineImgRef.current?.style.setProperty("--preview-position", percent);

    if (isScrubbing) {
      timelineRef.current.style.setProperty("--preview-progress", percent);
      indicatorRef.current.style.setProperty("--preview-progress", percent);
    }
  };

  document.addEventListener("mouseup", (e) => {
    if (isScrubbing) {
      handleTimelineScrubbing(e);
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isScrubbing) {
      handleTimelineUpdate(e);
    }
  });

  const handleTimelineScrubbing = (e) => {
    const timelinContainerPS =
      timelinContainerRef.current.getBoundingClientRect();
    const timelinContainerX = Math.floor(timelinContainerPS.x);

    const percent =
      Math.min(
        Math.max(e.clientX - timelinContainerX, 0),
        timelinContainerPS.width
      ) / timelinContainerPS.width;

    timelinContainerRef.current.style.setProperty(
      "--preview-position",
      percent
    );

    isScrubbing = (e.buttons & 1) === 1;

    videoContainerRef.current.classList.toggle("scrubbing", isScrubbing);

    console.log(wasPaused);
    if (isScrubbing) {
      e.preventDefault();
      wasPaused = videoRef.current.paused;
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      if (!wasPaused) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }
  };

  const toggleDescriptin = (e) => {
    setState((prev) => ({
      ...prev,
      toggleMaxHeight: !state.toggleMaxHeight,
    }));
  };

  const handleCommment = (e) => {
    setState((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  AWS.config.update({
    region: "us-east-1", // Replace with your AWS region
    // endpoint: "dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  });

  const ses = new AWS.SES({
    region: "us-east-1",
    port: 587,
    smtp: {
      host: "email-smtp.us-east-1.amazonaws.com",
      auth: {
        user: process.env.AWS_AUTH_USER,
        password: process.env.AWS_AUTH_PASSWORD,
      },
    },
  });

  const dbClient = new AWS.DynamoDB.DocumentClient();

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      Swal.fire({
        title: "Enter your name",
        input: "text",
        inputPlaceholder: "Enter your name here",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
        },
        preConfirm: (name) => {
          if (!name) {
            Swal.showValidationMessage("You need to write your name!");
          }
          return name;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setName(result.value);

          const paramsComment = {
            TableName: "comments",
            Item: {
              name: result.value,
              comment: state.comment,
              project_id: id,
            },
          };

          dbClient.put(paramsComment, function (err, data) {
            if (err) {
              console.log("err", err);
            } else {
              const confirmationParams = {
                Source: "abdessamadaitbella1998@gmail.com",
                Destination: {
                  ToAddresses: ["abdessamadaitbella1998@gmail.com"],
                },
                Message: {
                  Subject: {
                    Data: "Comment for a project in your Portfolio",
                  },
                  Body: {
                    Text: {
                      Data: `Name : ${result.value} \nComment : ${state.comment}`,
                    },
                  },
                },
              };

              // Send email notification
              ses.sendEmail(confirmationParams, (err, data) => {
                if (err) {
                  console.error("Error sending email:", err);
                } else {
                  console.log("Email sent successfully:", data);
                }
              });

              Swal.fire({
                icon: "success",
                title: "Success!",
                text: `Thank You ${name} your opinion matters`,
              });
              setState((prev) => ({
                ...prev,
                comment: "",
              }));
              setComment({
                name: result?.value,
                comment: state.comment,
                project_id: id,
              });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <Nav />
      <div className={`show  ${state.theater ? "" : "container"}`} theme-toggle-mode={mode}>
        <div class="video-info-containers">
          <div
            className={`video-container ${state.clicked ? "paused" : ""} ${
              state.theater ? "theater" : ""
            }`}
            ref={videoContainerRef}
          >
            <img class="thumbnail-img"></img>

            <video
              src={video.src}
              ref={videoRef}
              onClick={videoClicking}
              onEnded={ended}
              onKeyUp={keyDown}
              onLoadedMetadata={handleTotalTime}
              onTimeUpdate={handleTimeUpdate}
              tabIndex="0"
            />
            <div className="video-controls-container">
              <div
                className="timeline-container"
                ref={timelinContainerRef}
                onMouseMove={handleTimelineUpdate}
                onMouseDown={handleTimelineScrubbing}
              >
                <div className="timeline" ref={timelineRef}>
                  <div className="timeline-img">
                    <img
                      src={state.sourcePreviewImg}
                      alt=""
                      ref={timelineImgRef}
                    />
                  </div>
                  <div className="indicator" ref={indicatorRef}></div>
                </div>
              </div>
              <div className="controls">
                <div className="play-paus-video">
                  {state.clicked || state.agine ? (
                    <button
                      style={{ paddingLeft: "0" }}
                      onClick={videoClicking}
                    >
                      <svg class="play-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M8,5.14V19.14L19,12.14L8,5.14Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={videoClicking}>
                      <svg class="pause-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M14,19H18V5H14M6,19H10V5H6V19Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <button>
                  <img src="./assets/images/ico-next.svg" />
                </button>

                <div class="volume-container">
                  <button class="mute-btn" onClick={toggleVolume}>
                    {state.volume == true || state.volume == "high" ? (
                      <svg class="volume-high-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                        />
                      </svg>
                    ) : (
                      ""
                    )}
                    {state.volume == "low" && (
                      <svg class="volume-low-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                        />
                      </svg>
                    )}
                    {state.volume == false && (
                      <svg class="volume-muted-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                        />
                      </svg>
                    )}
                  </button>
                  <input
                    class="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="any"
                    onChange={handlevolume}
                  />
                </div>

                <div className="duration">
                  <div className="curent-time">{curentTime}</div> /
                  <div className="total-time">{state.totalTime}</div>
                </div>

                <button class="captions-btn">
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
                    />
                  </svg>
                </button>

                <button class="speed-btn wide-btn" onClick={ratechange}>
                  {`${state.rateVideo}x`}
                </button>

                <button class="theater-btn" onClick={toggleTheaters}>
                  {state.theater ? (
                    <svg class="tall" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
                      />
                    </svg>
                  ) : (
                    <svg class="wide" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
                      />
                    </svg>
                  )}
                </button>

                <button class="full-screen-btn" onClick={toggleFullscreen}>
                  <svg class="open" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={`${state.theater ? "container" : ""}`}>
            <div className={`videoInfo`}>
              <h3>{video.title}</h3>
              <div className="channel-profile">
                <div className="profile-info">
                  <div className="img">
                    <img src="/assets/images/profile.jpg" alt="" />
                  </div>
                  <div className="name-undername">
                    <p className="name">
                      Abdessamad Ait-bella
                      <img src="/assets/images/verf_circle.svg" alt="" />
                    </p>
                    <p className="undername">Junior Web Developer</p>
                  </div>
                </div>
                  <a target="_blank" href="https://github.com/Abde-Ait-bella/Prortfolio_2">
                    <div className="subscribe">
                      Source
                    </div>
                  </a>  
                <div className="like-dislike">
                  <div className="like-icon">
                    <img src="/assets/images/Like.svg" alt="" />
                    <div className="dislikes"></div>
                  </div>
                  <div className="bordered"></div>
                  <div className="dislike-icon">
                    <img src="/assets/images/Like.svg" alt="" />
                    <div className="dislikes"></div>
                  </div>
                </div>
                  <a target="_blank" className="text-dark" href="https://github.com/Abde-Ait-bella/Prortfolio_2">
                    <div className="share">
                        <img src="/assets/images/share.svg" alt="" />
                        <p>View</p>
                    </div>
                  </a>

                <div className="other-option">
                  <p>...</p>
                </div>
              </div>
            </div>
            <div
              className="description"
              style={{ maxHeight: `${state.toggleMaxHeight ? "" : "100px"} ` }}
            >
              <p className="release-date">172,816 views May 7, 2022</p>
              <p>
                JavaScript Simplified Course: https://javascriptsimplified.com
              </p>
              <p
                className="textdesc"
                style={{ width: `${state.toggleMaxHeight ? "100%" : "93%"} ` }}
              >
                {video.description}
              </p>
              <span onClick={toggleDescriptin}>
                {state.toggleMaxHeight ? "Show less" : "...more"}
              </span>
            </div>
            {
            loading ? 
              <div className="mt-3 mb-3">
                <SkeletonTheme>
                  <div className="row">
                      <div className="col-3">
                          <Skeleton height={33} />
                      </div>
                      <div className="col-2">
                          <Skeleton height={33}  />
                      </div>
                  </div>
                </SkeletonTheme>
              </div> 
          :
            <div className="comments-sort">
              <div className="comments">
                <h5><span>{dataCommant?.length}</span> Comments</h5>
              </div>
              <div className="sort">
                <div className="orderline"></div>
                <button>Sort by</button>
              </div>
            </div>
            }
            <div className="userprofile-commentinput">
              <div className="userprofile">
                <div className="img">
                  <img src="/assets/images/profile.jpg" alt="" />
                </div>
              </div>
              <div className="commentinput">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={handleCommment}
                  onKeyDown={handleKeyDown}
                  value={state.comment}
                />
                <div className="hrs">
                  <div className="hr b"></div>
                  <div className="hr a"></div>
                  <div className="hr c"></div>
                </div>
              </div>
            </div>
            <div className="comment-container">
              {comment?.project_id == id ? (
                <div className="comment">
                  <div className="userprofile">
                    <img src="/assets/images/userComment.png" alt="" />
                  </div>
                  <div className="username-comment">
                    <p className="username">{comment?.name}</p>
                    <p className="comment">{comment?.comment}</p>
                    <div className="like-dislike">
                      <div className="like-icon">
                        <img src="/assets/images/Like.svg" alt="" />
                        <div className="likes"></div>
                      </div>
                      <div className="dislike-icon">
                        <img src="/assets/images/Like.svg" alt="" />
                        <div className="dislikes"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
               {
                loading ? 
                <>
                  <div className="mt-1 mb-2">
                    <SkeletonTheme>
                      <div className="row">
                          <div className="col-1">
                              <Skeleton height={40} circle width={40}/>
                          </div>
                          <div className="col-11 pt-1">
                              <Skeleton height={33}  />
                          </div>
                      </div>
                    </SkeletonTheme>
                  </div> 
                  <div className="mt-1 mb-2">
                    <SkeletonTheme>
                      <div className="row">
                          <div className="col-1">
                              <Skeleton height={40} circle width={40}/>
                          </div>
                          <div className="col-11 pt-1">
                              <Skeleton height={33}  />
                          </div>
                      </div>
                    </SkeletonTheme>
                  </div> 
                  <div className="mt-1 mb-2">
                    <SkeletonTheme>
                      <div className="row">
                          <div className="col-1">
                              <Skeleton height={40} circle width={40}/>
                          </div>
                          <div className="col-11 pt-1">
                              <Skeleton height={33}  />
                          </div>
                      </div>
                    </SkeletonTheme>
                  </div> 
                </>
              :
              
                dataCommant?.map((d) => (
                  <div className="comment">
                    <div className="userprofile">
                      <img src="/assets/images/userComment.png" alt="" />
                    </div>
                    <div className="username-comment">
                      <p className="username">{d.name}</p>
                      <p className="comment">{d.comment}</p>
                      <div className="like-dislike">
                        <div className="like-icon">
                          <img src="/assets/images/Like.svg" alt="" />
                          <div className="likes"></div>
                        </div>
                        <div className="dislike-icon">
                          <img src="/assets/images/Like.svg" alt="" />
                          <div className="dislikes"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
        {!state.theater ? (
          <div className="videos">
            {videosOther.map((d, index) => (
              <Link to={`/show/${d.id}`}>
                <div className="video">
                  <video
                    src={d.src}
                    ref={(el) => (videosRef.current[index] = el)}
                    width="168"
                    height="94"
                    onMouseMove={() => hoverStartVideo(index)}
                    onMouseOut={() => hoverPausVideo(index)}
                    muted
                  />
                  <div className="video-info">
                    <p className="title">{d.title}</p>
                    <p className="statistic">{d.info}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Show;
