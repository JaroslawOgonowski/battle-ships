import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { colorSwitcher } from "./colorSwitcher";

//0 initial
//1 hit
//2 pudło
//3 hit and bb

export const Board = () => {
  const initialBoard: number[][] = [];
  for (let i = 0; i < 10; i++) {
    initialBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      initialBoard[i][j] = 0;
    }
  }

  const [board, setBoard] = useState(initialBoard);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][columnIndex] = 2; // Ustaw odpowiedni stan, np. 1 oznacza trafienie
    setBoard(updatedBoard);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th></th> {/* Puste pole w lewym górnym rogu */}
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
            {/* Dodanie cyfr w kolumnie po lewej stronie */}
            {row.map((cell, columnIndex) => (
              <StyledCell
                key={columnIndex}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                color={colorSwitcher(cell)}
                data-coordinates={`(${columnIndex}, ${rowIndex})`} // Przekazanie współrzędnych
              >
                {cell}
              </StyledCell>
            ))}
          </tr>
        ))}
      </TBody>
    </Table>
  );
};
