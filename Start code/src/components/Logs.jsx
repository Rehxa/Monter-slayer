/** @format */

import React from "react";

function Logs({ logs }) {
  return (
    <div className='container' id='log'>
      <h2>Battle Log</h2>
      <ul>
        {logs.map((log, index) => {
          const actorClass = log.isPlayer ? "log--player" : "log--monster";

          const actionClass = log.isDamage ? "log--damage" : "log--heal";

          return (
            <li key={`log-${index}`}>
              <span className={actorClass}>
                {log.isPlayer ? "Player" : "Monster"}
              </span>

              <span className={actionClass}>{log.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Logs;
