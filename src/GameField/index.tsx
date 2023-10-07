import { useState } from "react";
import { Board } from "../Board";
import {
  MainTitle,
  StyledGameField,
} from "./styled";
import { TurnInfo } from "../TurnInfo";

export const GameField = () => {
  const [yourTurn, setYourTurn] = useState(true);
  const [turnInfoTxt, setTurnInfoTxt] = useState("");
  const [turnInfoState, setTurnInfoState] = useState("");

  return (
    <>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      <StyledGameField>
        <Board
          yourTurn={yourTurn}
          setYourTurn={setYourTurn}
          setTurnInfoTxt={setTurnInfoTxt}
          setTurnInfoState={setTurnInfoState}
        />
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
      </StyledGameField>
    </>
  );
};
