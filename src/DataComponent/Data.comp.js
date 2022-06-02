import React from "react";
import classes from "./Data.module.css";

const DataComponent = ({ data }) => {
  const listing = [];
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
          listing[index] = <p key={index}>{data[key]}</p>;
        }
      })}
      <div className={classes.content__wrapper}>{listing}</div>
    </div>
  );
};

export default DataComponent;
