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
  const [showEndGame, setShowEndGame] = useState(false);
  
  if (showEndGame === false)
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
            setShowEndGame={setShowEndGame}
          />
          {gameOn === true ? (
            <>
              <TurnInfo
                yourTurn={yourTurn}
                turnInfoTxt={turnInfoTxt}
                turnInfoState={turnInfoState}
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
                setShowEndGame={setShowEndGame}
              />
            </>
          ) : null}
        </StyledGameField>
      </>
    );
  else return <Endgame showEndGame={showEndGame} yourTurn={yourTurn} />;
};
