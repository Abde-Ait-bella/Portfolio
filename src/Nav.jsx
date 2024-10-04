import React, { useEffect, useRef, useState } from "react";
import "./CSS/nav.scss";
import { Link, useParams } from "react-router-dom";

function Nav() {
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
      title: "Arbitre",
      info: "9,538 views 2 years ago",
      description:
        "JavaScript ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita dolore temporibus.",
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

  const [isFocused, setIsFocused] = useState();
  const [dataFiltred, setDataFiltred] = useState(data);
  const [clickItem, setClickItem] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isFocusedOnce, setIsFocusedOnce] = useState(false);

  // const id = useParams();
  const menuSearchRef = useRef();

  // useEffect(() => {
  //   setClickItem(false);
  // }, [id]);

  const handleFocus = () => {
    setIsFocused(true);
    if (!isFocused) {
      setClickItem(false);
      menuSearchRef.classList?.remove(1);
    }
    console.log("isFocusedOnce", isFocusedOnce);
    if (!isFocusedOnce) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 6000);
      setIsFocusedOnce(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    if (term) {
      setDataFiltred(
        data?.filter((d) =>
          d.description.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setDataFiltred(data);
    }
  };

  const clickedItem = () => {
    setClickItem(true);
  };

  return (
    <>
      <div className="navbar">
        {openAlert ? (
          <div className="search-alert">
            <div className="flech"></div>
            Hi ! Here you can search by technology to get the projects that used
            this technology.
          </div>
        ) : (
          ""
        )}
        <div className="left">
          <div className="berger-container">
            <p className="barMessage">
              Hi my visitors &#9829; , I'm passionate junior front-end developer
              with a keen interest in building user-friendly and visually
              appealing web applications...
            </p>
            <div className="menu-berger"></div>
          </div>
          <Link to={"/"} className="logo-href">
            <div className="logo">
              <img src="/assets/images/logo.svg" alt="test" />
              <i className="fa-solid fa-code"></i>
              <label>
                YouseeMe <sup>NOW</sup>
              </label>
            </div>
          </Link>
        </div>
        <div className="center">
          <div className="search" style={isFocused ? { width: "100%" } : {}}>
            {isFocused ? (
              <img
                style={isFocused ? { paddingLeft: "12px" } : {}}
                src="/assets/images/search_dark.svg"
                alt=""
              />
            ) : (
              ""
            )}
            <input
              className="fw-400"
              type="search"
              style={isFocused ? { width: "75%" } : {}}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search"
              onChange={handleSearch}
            />
            <button>
              <img src="/assets/images/search_dark.svg" alt="" />
            </button>
            <div
              ref={menuSearchRef}
              className={clickItem ? "menu-search clicked" : "menu-search"}
              onClick={clickedItem}
            >
              <div className="result-list">
                {dataFiltred.map((d) => (
                  <Link to={`/show/${d.id}`} onClick={clickedItem}>
                    <div className="item">
                      <div className="img">
                        <img src="/assets/images/search_dark.svg" alt="" />
                      </div>
                      <div className="title">
                        <p>{d.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mic">
            <Link
              href="https://www.linkedin.com/in/abde-ssamad-ait-bella-92481a249/"
              target="_blank"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
        <div className="right" style={{ width: "11%" }}>
          <div className="cam-video">
            <img src="/assets/images/cam.svg" alt="" />
          </div>
          <div className="notification">
            <img src="/assets/images/notif.svg" alt="" />
          </div>
          <div className="profile-img">
            <img src="/assets/images/profile.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;