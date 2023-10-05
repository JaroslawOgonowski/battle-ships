import React, { useRef, useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";
import { placeShips } from "./placeShips";

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

      if (clickedSquare.value > 0) {
        updatedBoard[rowIndex][columnIndex] = {
          ...clickedSquare,
          state: "Hit",
        };

        const targetValue = clickedSquare.value;
        let allSameValueCellsHaveState1 = true;

        for (let row = 0; row < 10; row++) {
          for (let col = 0; col < 10; col++) {
            const cell = updatedBoard[row][col];

            if (cell.value === targetValue && cell.state !== "Hit") {
              allSameValueCellsHaveState1 = false;
              break;
            }
          }

          if (!allSameValueCellsHaveState1) {
            break;
          }
        }

        if (allSameValueCellsHaveState1) {
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              const cell = updatedBoard[row][col];

              if (cell.value === targetValue) {
                cell.state = "Direct Hit";
              }
            }
          }
        }
        setBoard(updatedBoard);
      } else {
        updatedBoard[rowIndex][columnIndex] = {
          ...clickedSquare,
          state: "Missed",
        };

        setBoard(updatedBoard);
      }

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cell = updatedBoard[row][col];

          if (cell.state === "Direct Hit") {
            for (const [dx, dy] of directions) {
              const newRow = row + dy;
              const newColumn = col + dx;

              if (
                newRow >= 0 &&
                newRow < 10 &&
                newColumn >= 0 &&
                newColumn < 10 &&
                updatedBoard[newRow][newColumn].value === 0
              ) {
                updatedBoard[newRow][newColumn].state = "Missed";
              }
            }
          }
        }
      }

      setBoard(updatedBoard);
      setYourTurn(false);
      setTurnInfoTxt(`${columnHeaders[columnIndex]}${rowIndex + 1}`);
      setTurnInfoState(`${updatedBoard[rowIndex][columnIndex].state}`);
    } else return;
  };

  if (!yourTurn) {
    setTimeout(() => {
      setTurnInfoTxt("00")
      setTurnInfoState("state")
      setYourTurn(true);
    }, 3000);
    setYourTurn(true);
  }
  
  return (
    <Table>
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
                    : valueColorSwitcher(cell.value)
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
