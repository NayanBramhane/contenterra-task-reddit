import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already stored in local storage
        const storedData = localStorage.getItem("myData");
        if (storedData) {
          // Data is already available, do something with it
          const parsedData = JSON.parse(storedData);
          const children = parsedData.data.children;
          setCards(children);
        } else {
          // Fetch data from the URL
          const response = await fetch("https://www.reddit.com/r/reactjs.json");
          const data = await response.json();

          // Store data in local storage
          localStorage.setItem("myData", JSON.stringify(data));

          // Do something with the fetched data
          const storedData = localStorage.getItem("myData");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            const children = parsedData.data.children;
            setCards(children);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const children = parsedData.data.children;
      setCards(children);
    }
  }, []);

  return (
    <div>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.data.title}
          selfTextHtml={card.data.selftext_html}
          url={card.data.url}
          score={card.data.score}
        />
      ))}
    </div>
  );
}

export default App;
