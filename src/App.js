import { useEffect, useState } from "react";
import "./App.css";
import DataComponent from "./DataComponent/Data.comp";

function App() {
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useState("");
  const [sortParams, setSortParams] = useState("");

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://randomuser.me/api?results=30")
      .then((res) => res.json())
      .then((res) => {
        setData([
          ...res.results.map((user, index) => {
            return {
              sn: "" + (index + 1),
              name:
                user.name.title + " " + user.name.first + " " + user.name.last,
              location: user.location.country,
              email: user.email,
              registered: new Date(user.registered.date).toLocaleString(),
              picture: user.picture,
            };
          }),
        ]);
      });
  };

  const searchParamsFeild = (query) => {
    return data.filter((user) =>
      Object.values(user).some((value) => {
        if (typeof value === "object") return false;
        else {
          return value.toLowerCase().includes(query.toLowerCase());
        }
      })
    );
  };

  const sortingParamsFeild = (query, datas) => {
    console.log(
      datas.sort(function (a, b) {
        console.log(a[query]);
        return a[query] > b[query] ? 1 : -1;
      })
    );
    return datas.sort((user1, user2) => user1[query] - user2[query]);
  };

  const explictValue = ["picture"];

  return (
    <div className="App">
      <form>
        <input
          type="text"
          className={"input__search"}
          onChange={(e) => setSearchParams(e.target.value)}
          placeholder={"Search"}
        />
        <select onChange={(e) => setSortParams(e.target.value)}>
          <option disabled>{"Sort By"}</option>

          {data &&
            Object.keys(data[0]).map((keys) => {
              if (!explictValue.includes(keys)) {
                return <option value={keys}>{keys}</option>;
              } else {
                return null;
              }
            })}
        </select>
      </form>
      <div className="data__wrapper">
        {data ? (
          sortingParamsFeild(sortParams, searchParamsFeild(searchParams)).map(
            (user, index) => (
              <DataComponent key={index} data={user} sn={index} />
            )
          )
        ) : (
          <h1>Loading..</h1>
        )}
      </div>
    </div>
  );
}

export default App;
