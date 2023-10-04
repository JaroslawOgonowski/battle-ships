import { useState } from "react";
import { Board } from "../Board";
import {
  DestroyedShips,
  MainTitle,
  SingleBoard,
  StyledGameField,
  Title,
} from "./styled";
import { TurnInfo } from "../TurnInfo";

export const GameField = () => {
  const [yourTurn, setYourTurn] = useState(true);
  const [turnInfoTxt, setTurnInfoTxt] = useState("");

  return (
    <>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      <StyledGameField>
        <SingleBoard>
          <Title>Your board</Title>
          <Board yourTurn={yourTurn} setYourTurn={setYourTurn} setTurnInfoTxt={setTurnInfoTxt}/>
          <Title>Lost Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
        <TurnInfo yourTurn={yourTurn} turnInfoTxt={turnInfoTxt}/>
        <SingleBoard>
          <Title>Oponent board</Title>
          <Board yourTurn={yourTurn} setYourTurn={setYourTurn} setTurnInfoTxt={setTurnInfoTxt} oponentBoard />
          <Title>Lost Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
      </StyledGameField>
    </>
  );
};
