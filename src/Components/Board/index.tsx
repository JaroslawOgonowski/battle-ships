import React, { useEffect, useState } from "react";
import {
  Circle,
  ShipImage,
  Ships,
  SingleBoard,
  StyledCell,
  TBody,
  Table,
  TableHeader,
  Title,
} from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";
import { placeShips } from "./placeShips";
import { hitCheck } from "./hitCheck";
import mast1 from "./images/1mast.png";
import mast2 from "./images/2mast.png";
import mast3 from "./images/3mast.png";
import mast4 from "./images/4mast.png";
import mast5 from "./images/5mast.png";
import { GameInterface } from "../GameInterface";
import { opponentMove } from "./oponentMove";

type BoardProps = {
  opponentBoard?: boolean;
  yourTurn: boolean;
  setYourTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setTurnInfoTxt: React.Dispatch<React.SetStateAction<string>>;
  setTurnInfoState: React.Dispatch<React.SetStateAction<string>>;
  gameOn?: boolean;
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  endGame: boolean;
};

export const Board: React.FC<BoardProps> = ({
  opponentBoard,
  yourTurn,
  setYourTurn,
  setTurnInfoTxt,
  setTurnInfoState,
  gameOn,
  setGameOn,
  setEndGame,
  endGame,
}) => {
  const randomBoard: { value: number; state: string }[][] = [];
  for (let i = 0; i < 10; i++) {
    randomBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      randomBoard[i][j] = { value: 0, state: "Initial" };
    }
  }

  placeShips(randomBoard);
  const [board, setBoard] = useState(randomBoard);
  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i + 1);

  const shipsData = [
    { id: "1", src: mast5, state: 0 },
    { id: "2", src: mast4, state: 0 },
    { id: "3", src: mast2, state: 0 },
    { id: "4", src: mast2, state: 0 },
    { id: "5", src: mast3, state: 0 },
    { id: "6", src: mast3, state: 0 },
    { id: "7", src: mast1, state: 0 },
    { id: "8", src: mast1, state: 0 },
    { id: "9", src: mast1, state: 0 },
  ];
  const [ships, setShips] = useState(shipsData);

  useEffect(() => {
    if (ships.every((ship) => ship.state === 1)) {
      setEndGame(true);
    }
  }, [ships]);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (yourTurn === true && opponentBoard) {
      if (board[rowIndex][columnIndex].state !== "Initial") {
        return;
      }

      const updatedBoard = [...board];
      const clickedSquare = updatedBoard[rowIndex][columnIndex];

      hitCheck(
        rowIndex,
        columnIndex,
        updatedBoard,
        clickedSquare,
        setBoard,
        ships,
        setShips,
        setEndGame
      );
      setBoard(updatedBoard);
      setTurnInfoTxt(`${columnHeaders[columnIndex]}${rowIndex + 1}`);
      setTurnInfoState(`${updatedBoard[rowIndex][columnIndex].state}`);
      if (!endGame) {
        setYourTurn(false);
      }
    } else return;
  };
  const [brightness, setBrightness] = useState(0.3);

  useEffect(() => {
    if (!yourTurn && !opponentBoard && !endGame) {
      const timeoutId = setTimeout(() => {
        opponentMove(
          board,
          setBoard,
          ships,
          setShips,
          setEndGame,
          setTurnInfoTxt,
          setTurnInfoState,
          columnHeaders
        );
        if (endGame === false) {
          setYourTurn(true);
        }
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [yourTurn, opponentBoard, setYourTurn]);

  useEffect(() => {
    const updateBrightness = () => {
      if (!gameOn) {
        setBrightness(1);
      } else if (!opponentBoard && yourTurn) {
        setBrightness(0.3);
      } else if (opponentBoard && !yourTurn) {
        setBrightness(0.3);
      } else if (opponentBoard && yourTurn) {
        setBrightness(1);
      } else if (!opponentBoard && !yourTurn) {
        setBrightness(1);
      }
    };
    updateBrightness();
    return () => {};
  }, [yourTurn, opponentBoard, gameOn]);

  return (
    <>
      <SingleBoard>
        {gameOn ? (
          <Title>{opponentBoard ? "Attack stance" : "Defense stance"}</Title>
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
          </>
        )}
        <Table style={{ filter: `brightness(${brightness})` }}>
          <thead>
            <tr>
              <th></th>
              {columnHeaders.map((header, index) => (
                <TableHeader key={index}>{header}</TableHeader>
              ))}
            </tr>
          </thead>
          <TBody>
            <Circle />
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <TableHeader>{rowHeaders[rowIndex]}</TableHeader>
                {row.map((cell, columnIndex) => (
                  <StyledCell
                    key={columnIndex}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    color={
                      opponentBoard
                        ? stateColorSwitcher(cell.state)
                        : valueColorSwitcher(cell.value, cell.state)
                    }
                    data-coordinates={`(${columnHeaders[columnIndex]}, ${
                      rowIndex + 1
                    })`}
                  ></StyledCell>
                ))}
              </tr>
            ))}
          </TBody>
        </Table>
        {gameOn ? (
          <>
            <Title>{!opponentBoard ? "Your fleet" : "Opponent fleet"}</Title>
            <Ships>
              {ships.map((ship) => (
                <ShipImage
                  key={ship.id}
                  src={ship.src}
                  id={ship.id}
                  style={
                    ship.state === 0
                      ? {}
                      : { filter: "hue-rotate(270deg) contrast(2)" }
                  }
                />
              ))}
            </Ships>
          </>
        ) : null}
      </SingleBoard>
      {gameOn === false && !opponentBoard ? (
        <GameInterface
          setGameOn={setGameOn}
          board={randomBoard}
          setBoard={setBoard}
        />
      ) : (
        ""
      )}
    </>
  );
};
