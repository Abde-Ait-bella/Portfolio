import React, { useState } from "react";
import "./CSS/Contact.scss";
import * as AWS from "aws-sdk";
import Swal from "sweetalert2";
import { UseMode } from "./Context";


AWS.config.update({
  region: "us-east-1", // Replace with your AWS region
  // endpoint: "dynamodb.us-east-1.amazonaws.com",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
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

function Contact() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [name, setName] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const {mode} = UseMode();


  const dbClient = new AWS.DynamoDB.DocumentClient();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true)
    const params = {
      TableName: "contact",
      Item: {
        email: email,
        message: message,
        name: name,
      },
    };

    dbClient.put(params, function (err, data) {
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
              Data: "Contact Portfolio",
            },
            Body: {
              Text: {
                Data: `Name : ${name} \nMessage : ${message} \nEmail : ${email}`,
              },
            },
          },
        };
        const sendPromise = ses.sendEmail(confirmationParams).promise();
        return sendPromise
          .then(
            (data) => data,
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: `Thank You ${name} for your message`,
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            }),
            setLoading(false)
          )
          .catch((err) => console.log("err", err),
          setLoading(false)
        );
      }
    });
  };

  const copyPhone = () => {
    setCopiedPhone(true);
    navigator.clipboard.writeText("+212681783861");
    setTimeout(() => {
      setCopiedPhone(false);
    }, 5000);
  };

  const copyEmail = () => {
    setCopiedEmail(true);
    navigator.clipboard.writeText("abdessamadaitbella1998@gmail.com");
    setTimeout(() => {
      setCopiedEmail(false);
    }, 5000);
  };

  return (
    <div>
      <div className="contacts"  theme-toggle-mode={mode}>
        <div className="form">
          <form onSubmit={submitForm} action="">
            <div className="inputs-container">
              <div className={`name ${name ? "filled" : ""}`}>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <i class="fa-solid fa-user"></i>
                <label>Your name</label>
              </div>
              <div className={`email ${email ? "filled" : ""}`}>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i class="fa-solid fa-envelope"></i>
                <label>Your email</label>
              </div>
              <div className={`message ${message ? "filled" : ""}`}>
                <textarea
                  rows={3}
                  name=""
                  id=""
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <label>Message</label>
                <i class="fa-solid fa-message"></i>
              </div>
            </div>
            <button>{
            loading ? 
              <>
                  <span>Submit</span>
                  <span class="spinner-grow spinner-grow-sm ms-2" role="status" aria-hidden="true"></span>
                  <span class="sr-only">Loading...</span>
              </>
            : 
              "Submit" 
                }
            </button>
          </form>
        </div>
        <div className="outil-contact">
          <div className="phone">
            <div className="phone-label">
              <i class="fa-solid fa-phone"></i>
              <label>Phone / Whatssap</label>
            </div>
            <div className="phone-number">
              <p>+212.6.81.78.38.61</p>
              {!copiedPhone ? (
                <i class="fa-regular fa-copy" onClick={copyPhone}></i>
              ) : (
                <i class="fa-solid fa-circle-check"></i>
              )}
            </div>
          </div>

          <div className="email">
            <div className="email-label">
              <i class="fa-solid fa-at"></i>
              <label>Email</label>
            </div>
            <div className="email-text">
              <p>abdessamadaitbella1998@gmail.com</p>
              {!copiedEmail ? (
                <i class="fa-regular fa-copy" onClick={copyEmail}></i>
              ) : (
                <i class="fa-solid fa-circle-check"></i>
              )}
            </div>
          </div>

          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/abde-ssamad-ait-bella-92481a249/"
              target="_blank"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/Abde-Ait-bella" target="_blank">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
