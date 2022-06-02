import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://randomuser.me/api?results=30")
      .then((res) => res.json())
      .then((res) => setData(res.results));
  };
  return <div className="App">{data ? <></> : <h1>Loading..</h1>}</div>;
}

export default App;
