import { useState } from "react";
import { Board } from "../Board";
import {
  DestroyedShips,
  MainTitle,
  ShipImage,
  SingleBoard,
  StyledGameField,
  Title,
} from "./styled";
import { TurnInfo } from "../TurnInfo";
import mast1 from "./ships/1mast.png";
import mast2 from "./ships/2mast.png";
import mast3 from "./ships/3mast.png";
import mast4 from "./ships/4mast.png";
import mast5 from "./ships/5mast.png";

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
          <Title>Your fleet</Title>
          <DestroyedShips>
            <ShipImage src={mast1} />
            <ShipImage src={mast1} />
            <ShipImage src={mast1} />
            <ShipImage src={mast2} />
            <ShipImage src={mast2} />
            <ShipImage src={mast3} />
            <ShipImage src={mast3} />
            <ShipImage src={mast4} />
            <ShipImage src={mast5} />
          </DestroyedShips>
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
            opponentBoard
          />
          <Title>opponent fleet</Title>
          <DestroyedShips></DestroyedShips>
        </SingleBoard>
      </StyledGameField>
    </>
  );
};
