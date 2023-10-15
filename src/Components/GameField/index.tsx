import { useState } from "react";
import { Board } from "../Board";
import { MainTitle, StyledGameField } from "./styled";
import { TurnInfo } from "../TurnInfo";
import { Endgame } from "../EndGame";

export const GameField = () => {
  const [yourTurn, setYourTurn] = useState(true);
  const [turnInfoTxt, setTurnInfoTxt] = useState("");
  const [turnInfoState, setTurnInfoState] = useState("");
  const [gameOn, setGameOn] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [stats, setStats] = useState({
    playerHits: 0,
    playerMissed: 0,
    opponentHits: 0,
    opponentMissed: 0,
  });

  if (endGame === false)
    return (
      <>
        <MainTitle>📡 Battle ships ⚓</MainTitle>
        <StyledGameField>
          <Board
            yourTurn={yourTurn}
            setYourTurn={setYourTurn}
            setTurnInfoTxt={setTurnInfoTxt}
            setTurnInfoState={setTurnInfoState}
            gameOn={gameOn}
            setGameOn={setGameOn}
            setEndGame={setEndGame}
            endGame={endGame}
            stats={stats}
            setStats={setStats}
          />
          {gameOn === true ? (
            <>
              <TurnInfo
                yourTurn={yourTurn}
                turnInfoTxt={turnInfoTxt}
                turnInfoState={turnInfoState}
                stats={stats}
              />
              <Board
                yourTurn={yourTurn}
                setYourTurn={setYourTurn}
                setTurnInfoTxt={setTurnInfoTxt}
                setTurnInfoState={setTurnInfoState}
                opponentBoard
                gameOn={gameOn}
                setGameOn={setGameOn}
                setEndGame={setEndGame}
                endGame={endGame}
                stats={stats}
                setStats={setStats}
              />
            </>
          ) : null}
        </StyledGameField>
      </>
    );
  else return <Endgame stats={stats} yourTurn={yourTurn} />;
};
