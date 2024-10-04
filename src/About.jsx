import React from "react";
import "./CSS/About.scss";

function About() {
  return (
    <div className="about">
      <div className="about-me">
        <h3>Hi there!</h3>
        <p>
          I'm from a Taroudant Morocco, a passionate junior developer with a
          knack for creating engaging web experiences. I specialize in front-end
          development, particularly with HTML, CSS, JavaScript, and React.js.
          Currently, I'm diving into ReactJs, SASS for styling and enhancing my
          skills with backend technologies like Laravel.
        </p>
      </div>
      <div className="what-i-do">
        <h3>What i do!</h3>
        <div className="icons-container">
          <div className="first">
            <div className="icon javascript">
              <img src="./assets/images/javascript.png" alt="" />
              <p>Javascript</p>
            </div>
            <div className="icon laravel">
              <img src="./assets/images/laravel.png" alt="" />
              <p>Laravel</p>
            </div>
            <div className="icon css">
              <img src="./assets/images/css.png" alt="" />
              <p>CSS</p>
            </div>
            <div className="icon sass">
              <img src="./assets/images/sass.png" alt="" />
              <p>SASS</p>
            </div>
          </div>
          <div className="second">
            <div className="icon reactjs">
              <img src="./assets/images/reactjs.png" alt="" />
              <p>ReactJs</p>
            </div>
            <div className="icon bootstrap">
              <img src="./assets/images/bootstrap.png" alt="" />
              <p>bootstrap</p>
            </div>
            <div className="icon github">
              <img src="./assets/images/github.png" alt="" />
              <p>Github</p>
            </div>
            <div className="icon postman">
              <img src="./assets/images/postman.png" alt="" />
              <p>Postman</p>
            </div>
          </div>
          <div className="third">
            <div className="icon html">
              <img src="./assets/images/html.png" alt="" />
              <p>HTML</p>
            </div>
            <div className="icon mysql">
              <img src="./assets/images/mysql.png" alt="" />
              <p>Mysql</p>
            </div>
          </div>
        </div>
      </div>
      <div className="why-i-love-it"></div>
      <div className="Lets-Connect"></div>
    </div>
  );
}

export default About;
