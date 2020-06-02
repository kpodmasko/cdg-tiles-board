import React, { useState, useCallback } from "react";

import Board from "@components/Board";

import { testIds } from "@constants";
import { shuffle } from "@helpers";
import getData from "@utils/getData";

import "./App.css";

const data = getData();

const rootClassName = "app";

function renderCardContent(viewValue) {
  return (
    <div style={{ background: viewValue, width: "100%", height: "100%" }} />
  );
}

function App() {
  const [round, setRound] = useState(1);
  const [game, setGame] = useState(shuffle(Object.keys(data)));
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRoundPlayed = useCallback((_isGameOver) => {
    if (_isGameOver) {
      setIsGameOver(true);
      return;
    }

    setRound((round) => round + 1);
  }, []);

  const handleResetClick = useCallback(() => {
    setGame(shuffle(Object.keys(data)));
    setRound(1);
    setIsGameOver(false);
  }, []);

  return (
    <div className={`${rootClassName}`} data-testid={testIds.app}>
      <header className={`${rootClassName}__header`}>
        <h1>Round {round}</h1>
        <span
          className={`${rootClassName}__reset-button`}
          onClick={handleResetClick}
        >
          {/*to skip adding FA library and save space*/}
          <img
            alt="Reset"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABFElEQVRIie3VMW7CMBTGcahUlsLIyAVgQGJpT8EFeglOQtUcgTN0ao9BJ1ZWptKBAfHr0IfkpoE4Vdn4pMiJ8773jx37udW6qonQRz95HmDjtz7xjieMcpO38RJXO+mf4lABOWqPAp06wCwxzWpi73CPZ+zC83YSgkkSKO4nmSMfYx2+oiqgh1XF0FfoNYDsYrqG5ZeLM/O7yAFEniI883NBIDdpyXsf9uWlAN2wf1wEcMp/89dkuSoDtvEl3UsB1tEOy4H/BXiN9jE3QbrMk77qZY5RbJYdxpmAZhs12TDrBpD8UoNb34XrGFjgoe7Ha1AsW+hE4n3F0I86YJp4Kst9HWiEOZbYVkA2GCTxPw6sq7L0BQdDMu9aZpOpAAAAAElFTkSuQmCC"
          />
        </span>
      </header>
      {isGameOver ? (
        <div className={`${rootClassName}__game-over`}>Game is Over !!!</div>
      ) : (
        <Board
          cards={data}
          onRoundPlayed={handleRoundPlayed}
          game={game}
          renderCardContent={renderCardContent}
        />
      )}
    </div>
  );
}

export default App;
