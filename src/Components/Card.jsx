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

  // Check if the data is available before rendering the component
  if (!title || !selfTextHtml || !url || !score) {
    return null; 
  }

  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <div
        className="selfText"
        dangerouslySetInnerHTML={{ __html: selfText }}
      ></div>
      <a className="url" href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default Card;
