import React, { useEffect, useRef, useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";
import { placeShips } from "./placeShips";
import { hitCheck } from "./hitCheck";

type BoardProps = {
  oponentBoard?: boolean;
  yourTurn: boolean;
  setYourTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setTurnInfoTxt: React.Dispatch<React.SetStateAction<string>>;
  setTurnInfoState: React.Dispatch<React.SetStateAction<string>>;
};

export const Board: React.FC<BoardProps> = ({
  oponentBoard,
  yourTurn,
  setYourTurn,
  setTurnInfoTxt,
  setTurnInfoState,
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

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (yourTurn === true && oponentBoard) {
      const directions = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
      ];

      if (board[rowIndex][columnIndex].state !== "Initial") {
        return;
      }

      const updatedBoard = [...board];
      const clickedSquare = updatedBoard[rowIndex][columnIndex];

      hitCheck(rowIndex, columnIndex, updatedBoard, clickedSquare, setBoard);
      setBoard(updatedBoard);
      setYourTurn(false);
      setTurnInfoTxt(`${columnHeaders[columnIndex]}${rowIndex + 1}`);
      setTurnInfoState(`${updatedBoard[rowIndex][columnIndex].state}`);
    } else return;
  };

  const [brightness, setBrightness] = useState(0.3);

  const oponentMove = () => {
    // random move
    const randomRow = Math.floor(Math.random() * 10);
    const randomColumn = Math.floor(Math.random() * 10);
    console.log(randomColumn, randomRow);
    if (board[randomRow][randomColumn].state !== "Initial") {
      console.log("powtórka");
      oponentMove();
      return;
    }

    const updatedBoard = [...board];
    const clickedSquare = updatedBoard[randomRow][randomColumn];

    hitCheck(randomRow, randomColumn, updatedBoard, clickedSquare, setBoard);
    setBoard(updatedBoard);
    setTurnInfoTxt(`${columnHeaders[randomColumn]}${randomRow + 1}`);
    setTurnInfoState(`${updatedBoard[randomRow][randomColumn].state}`);
  };

  useEffect(() => {
    if (!yourTurn && !oponentBoard) {
      const timeoutId = setTimeout(() => {
        oponentMove();
        setYourTurn(true);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [yourTurn, oponentBoard]);

  useEffect(() => {
    const updateBrightness = () => {
      if (!oponentBoard && yourTurn) {
        setBrightness(0.3);
      } else if (oponentBoard && !yourTurn) {
        setBrightness(0.3);
      } else if (oponentBoard && yourTurn) {
        setBrightness(1);
      } else if (!oponentBoard && !yourTurn) {
        setBrightness(1);
      }
    };
    updateBrightness();
    return () => {};
  }, [yourTurn, oponentBoard]);

  return (
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
            <TableHeader>{rowHeaders[rowIndex]}</TableHeader>{" "}
            {row.map((cell, columnIndex) => (
              <StyledCell
                key={columnIndex}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                color={
                  oponentBoard
                    ? stateColorSwitcher(cell.state)
                    : //: valueColorSwitcher(cell.value)
                      stateColorSwitcher(cell.state)
                }
                data-coordinates={`(${columnHeaders[columnIndex]}, ${
                  rowIndex + 1
                })`}
              >
                {cell.value}
              </StyledCell>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
