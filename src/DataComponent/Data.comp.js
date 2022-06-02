import React from "react";
import classes from "./Data.module.css";

const DataComponent = ({ data }) => {
  return (
    <div className={classes.profileCard}>
      {Object.keys(data).map((key, index) => {
        if (key === "picture") {
          return (
            <div className={classes.imageWrapper} key={index}>
              <img src={data[key].large} alt={"Static "} />
            </div>
          );
        } else {
          return <p key={index}>{data[key]}</p>;
        }
      })}
      ;
    </div>
  );
};

export default DataComponent;
