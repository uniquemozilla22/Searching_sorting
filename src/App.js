import { useEffect, useState } from "react";
import "./App.css";
import DataComponent from "./DataComponent/Data.comp";

function App() {
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useState("");

  useEffect(() => fetchData(), []);
  useEffect(() => {
    if (data) searchParamsFeild(searchParams);
  }, [searchParams]);

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
    console.log(
      data.filter((user) =>
        Object.values(user).map((value) => {
          if (typeof value === "object") return false;
          return value.toLowerCase().includes(query.toLowerCase());
        })
      )
    );
    return data.filter((user) =>
      Object.values(user).some((value) => {
        if (typeof value === "object") return false;
        else {
          return value.toLowerCase().includes(query.toLowerCase());
        }
      })
    );
  };

  // const searchingData = (query, data) => {
  //   console.log(data);
  //   let updatedData = data;
  //   if (!query) return data;
  //   else {
  //     updatedData = nameFilter(data, query);
  //     updatedData = emailFilter(data, query);
  //   }

  //   return updatedData;
  // };

  // const nameFilter = (data, query) => {
  //   const name = data.filter((user) =>
  //     (user.name.last + user.name.first + user.name.title)
  //       .toLowerCase()
  //       .includes(query.toLowerCase())
  //   );
  //   return [...name];
  // };

  // const emailFilter = (data, query) => {
  //   const name = data.filter((user) =>
  //     user.email.toLowerCase().includes(query.toLowerCase())
  //   );
  //   return [...name];
  // };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          className={"input__search"}
          onChange={(e) => setSearchParams(e.target.value)}
        />
      </form>
      <div className="data__wrapper">
        {data ? (
          searchParamsFeild(searchParams).map((user, index) => (
            <DataComponent key={index} data={user} sn={index} />
          ))
        ) : (
          <h1>Loading..</h1>
        )}
      </div>
    </div>
  );
}

export default App;
