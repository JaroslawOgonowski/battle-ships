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
  const [turnInfoState, setTurnInfoState] = useState("");

  return (
    <>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      <StyledGameField>
        <SingleBoard>
          <Title>Defence stance</Title>
          <Board
            yourTurn={yourTurn}
            setYourTurn={setYourTurn}
            setTurnInfoTxt={setTurnInfoTxt}
            setTurnInfoState={setTurnInfoState}
          />
          <Title>Lost Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
        <TurnInfo
          yourTurn={yourTurn}
          turnInfoTxt={turnInfoTxt}
          turnInfoState={turnInfoState}
        />
        <SingleBoard>
          <Title>Attack stance</Title>
          <Board
            yourTurn={yourTurn}
            setYourTurn={setYourTurn}
            setTurnInfoTxt={setTurnInfoTxt}
            setTurnInfoState={setTurnInfoState}
            oponentBoard
          />
          <Title>Lost Ships</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
      </StyledGameField>
    </>
  );
};
