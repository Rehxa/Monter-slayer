/** @format */

import React from "react";

function GameOver({ winner, restartGame }) {
  return (
    <div className='container'>
      <h2>Game Over!</h2>
      <h3>
        {winner === "draw"
          ? "It's a draw!"
          : winner === "player"
          ? "Player has Won!"
          : "Monster has won !"}
      </h3>
      <button onClick={restartGame}>NEW GAME</button>
    </div>
  );
}

export default GameOver;
