import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { stateColorSwitcher } from "./stateColorSwitcher";
import { valueColorSwitcher } from "./valueColorSwitcher";
import { placeShips } from "./placeShips";

type Cell = {
  value: number;
  state: number;
};

type BoardProps = {
  boardArray: Cell[][];
  oponentBoard?: boolean;
};

export const Board: React.FC<BoardProps> = ({ boardArray, oponentBoard }) => {
  const randomBoard: { value: number; state: number }[][] = [];
  for (let i = 0; i < 10; i++) {
    randomBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      randomBoard[i][j] = { value: 0, state: 0 };
    }
  }

  placeShips(randomBoard);
  const [board, setBoard] = useState(randomBoard);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
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

    if (board[rowIndex][columnIndex].state !== 0) {
      return;
    }

    const updatedBoard = [...board];
    const clickedSquare = updatedBoard[rowIndex][columnIndex];

    if (clickedSquare.value > 0) {
      updatedBoard[rowIndex][columnIndex] = {
        ...clickedSquare,
        state: 1,
      };

      const targetValue = clickedSquare.value;
      let allSameValueCellsHaveState1 = true;

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cell = updatedBoard[row][col];

          if (cell.value === targetValue && cell.state !== 1) {
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
              cell.state = 3;
            }
          }
        }
      }
      setBoard(updatedBoard);
    } else {
      updatedBoard[rowIndex][columnIndex] = {
        ...clickedSquare,
        state: 2,
      };

      setBoard(updatedBoard);
    }

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = updatedBoard[row][col];

        if (cell.state === 3) {
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
              updatedBoard[newRow][newColumn].state = 2;
            }
          }
        }
      }
    }

    setBoard(updatedBoard);
  };

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
