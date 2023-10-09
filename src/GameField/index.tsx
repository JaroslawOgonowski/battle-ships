import { useState } from "react";
import { Board } from "../Board";
import { MainTitle, StyledGameField } from "./styled";
import { TurnInfo } from "../TurnInfo";
import { GameInterface } from "../GameInterface";

export const GameField = () => {
  const [yourTurn, setYourTurn] = useState(true);
  const [turnInfoTxt, setTurnInfoTxt] = useState("");
  const [turnInfoState, setTurnInfoState] = useState("");
  const [gameOn, setGameOn] = useState(false);

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
        />
        {gameOn === true ? null : <GameInterface gameOn={gameOn} setGameOn={setGameOn} />}
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
            />
          </>
        ) : null}
      </StyledGameField>
    </>
  );
};
