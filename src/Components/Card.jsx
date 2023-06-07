/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ title, selfTextHtml, url, score }) => {
  const [selfText, setSelfText] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const decodedHtml = parser.parseFromString(selfTextHtml, "text/html")
      .documentElement.textContent;
    setSelfText(decodedHtml);
  }, [selfTextHtml]);

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <div
        className="selfText"
        dangerouslySetInnerHTML={{ __html: selfText }}
      ></div>
      <div>
        <a className="url" href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default Card;
