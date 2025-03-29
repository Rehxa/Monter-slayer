/** @format */

import React, { useState, useEffect } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Logs from "./Logs";
import "../index.css";
// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const canSpecialAttack = round > 0 && round % 3 === 0;
  const isGameActive = !gameOver && playerHealth > 0 && monsterHealth > 0;

  useEffect(() => {
    checkGameStatus();
  }, [playerHealth, monsterHealth]);

  const checkGameStatus = () => {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      setGameOver(true);
      setWinner("draw");
    } else if (playerHealth <= 0) {
      setGameOver(true);
      setWinner("monster");
    } else if (monsterHealth <= 0) {
      setGameOver(true);
      setWinner("player");
    }
  };

  const monsterAttack = () => {
    const damage = getRandomValue(5, 15);
    setPlayerHealth((prev) => Math.max(0, prev - damage));
    setLogs((prev) => [...prev, createLogAttack(false, damage)]);
  };

  const handleAttack = () => {
    const damage = getRandomValue(5, 12);
    setMonsterHealth((prev) => Math.max(0, prev - damage));
    setLogs((prev) => [...prev, createLogAttack(true, damage)]);

    if (monsterHealth > 0) monsterAttack();
    setRound((prev) => prev + 1);
  };

  const handleSpecialAttack = () => {
    const damage = getRandomValue(10, 25);
    setMonsterHealth((prev) => Math.max(0, prev - damage));
    setLogs((prev) => [...prev, createLogAttack(true, damage)]);

    if (monsterHealth > 0) monsterAttack();
    setRound((prev) => prev + 1);
  };

  const handleHeal = () => {
    const healing = getRandomValue(8, 20);
    setPlayerHealth((prev) => Math.min(100, prev + healing));
    setLogs((prev) => [...prev, createLogHeal(healing)]);

    if (monsterHealth > 0) monsterAttack();
    setRound((prev) => prev + 1);
  };

  const handleKIllself = () => {
    setPlayerHealth(0);
    setGameOver(true);
    setWinner("monster");
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setRound(0);
    setGameOver(false);
    setWinner(null);
  };
  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function createLogAttack(isPlayer, damage) {
    return {
      isPlayer: isPlayer,
      isDamage: true,
      text: ` takes ${damage} damages`,
    };
  }

  function createLogHeal(healing) {
    return {
      isPlayer: true,
      isDamage: false,
      text: ` heal ${healing} life points`,
    };
  }
  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <section>
      {gameOver ? (
        <>
          <Entity health={monsterHealth} name='Monster Health' />
          <Entity health={playerHealth} name='Your Health' />
          <GameOver winner={winner} restartGame={restartGame} />
        </>
      ) : (
        <>
          <Entity health={monsterHealth} name='Monster Health' />
          <Entity health={playerHealth} name='Your Health' />

          <div className='container' id='controls'>
            <button onClick={handleAttack} disabled={!isGameActive}>
              ATTACK
            </button>
            <button
              onClick={handleSpecialAttack}
              disabled={!isGameActive || !canSpecialAttack}>
              SPECIAL !
            </button>
            <button onClick={handleHeal} disabled={!isGameActive}>
              HEAL
            </button>
            <button onClick={handleKIllself} disabled={!isGameActive}>
              Kill YOURSELF
            </button>
          </div>
        </>
      )}
      <Logs logs={logs} />
    </section>
  );
}

export default Game;
