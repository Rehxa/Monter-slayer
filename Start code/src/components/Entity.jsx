/** @format */

// components/Entity.jsx
import React from "react";

function Entity({ health, name }) {
  return (
    <div className='container'>
      <h2>{name}</h2>
      <div className='healthbar'>
        <div
          className='healthbar__value'
          style={{
            width: `${health}%`,
            backgroundColor: health > 30 ? "#00a876" : "red",
          }}></div>
      </div>
      <p>{health}%</p>
    </div>
  );
}

export default Entity;
