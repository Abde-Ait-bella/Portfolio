import React, { useEffect, useRef, useState } from "react";
import "./CSS/nav.scss";
import { Link } from "react-router-dom";
import { UseMode } from "./Context";

function Nav() {
  const {data} = UseMode();

  const [isFocused, setIsFocused] = useState();
  const [dataFiltred, setDataFiltred] = useState(data);
  const [clickItem, setClickItem] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isFocusedOnce, setIsFocusedOnce] = useState(false);
  const {toggleMode, mode} = UseMode();

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
      <div className="navbar" 
      theme-toggle-mode={mode}
      >
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
              mode === 'light' ?
                <img
                  style={isFocused ? { paddingLeft: "12px" } : {}}
                  src="/assets/images/search_dark.svg"
                  alt=""
                />
                :
                <img
                style={isFocused ? { paddingLeft: "12px" } : {}}
                src="/assets/images/search.svg"
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
              {
                mode === 'light' ?
                    <img
                      src="/assets/images/search_dark.svg"
                      alt=""
                    />
                    :
                    <img
                    src="/assets/images/search.svg"
                    alt=""
                  />
              }
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
                        {
                          mode === 'light' ?
                              <img
                                src="/assets/images/search_dark.svg"
                                alt=""
                              />
                              :
                              <img
                              src="/assets/images/search.svg"
                              alt=""
                            />
                        }
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
          <div className="linkdin">
            <Link
              to="https://www.linkedin.com/in/abde-ssamad-ait-bella-92481a249/"
              target="_blank"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
        <div className="right" style={{ width: "11%" }}>
          <div className="git">
            <Link
                to="https://github.com/Abde-Ait-bella"
                target="_blank"
              >
              <i class="fa-brands fa-github-alt"></i>
            </Link>
          </div>
          <div className="mode" onClick={toggleMode}>
            
            {
              mode === 'light' ?
              <i class="fa-solid fa-moon"></i>
                  :
              <i class="fa-regular fa-moon"></i>
            }
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
