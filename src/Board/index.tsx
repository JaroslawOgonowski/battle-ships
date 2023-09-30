import React, { useState } from "react";
import { Circle, StyledCell, TBody, Table, TableHeader } from "./styled";
import { colorSwitcher } from "./colorSwitcher";

type BoardProps = {
  boardArray: number[][];
};

export const Board: React.FC<BoardProps> = ({ boardArray }) => {

const randomBoard: number[][] = [];

for (let i = 0; i < 10; i++) {
  randomBoard[i] = [];
  for (let j = 0; j < 10; j++) {
    randomBoard[i][j] = 0; // Ustaw początkowo wszystkie komórki na 0
  }
}

// Funkcja do ustawiania zestawów jednek wokół siebie
function placeSet(count: number, value: number, board: number[][]) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], // Góra, dół, lewo, prawo
    [-1, -1], [-1, 1], [1, -1], [1, 1], // Przekątne
  ];

  while (count > 0) {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);

    if (board[randomRow][randomCol] === 0) {
      // Sprawdź, czy można umieścić zestaw jednek w tym miejscu
      let canPlace = true;

      for (const [dx, dy] of directions) {
        const newRow = randomRow + dx;
        const newCol = randomCol + dy;

        if (
          newRow < 0 ||
          newRow >= 10 ||
          newCol < 0 ||
          newCol >= 10 ||
          board[newRow][newCol] !== 0
        ) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        // Umieść zestaw jednek wokół
        board[randomRow][randomCol] = value;
        for (const [dx, dy] of directions) {
          const newRow = randomRow + dx;
          const newCol = randomCol + dy;
          board[newRow][newCol] = 0;
        }
        count--; // Zmniejsz licznik zestawów do umieszczenia
      }
    }
  }
}
function placeTwoAdjacent(board: number[][], value: number) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // Góra, dół, lewo, prawo
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Przekątne
  ];

  while (true) {
    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 9); // Ograniczenie, aby zmieścić dwa sąsiednie pola

    if (board[randomRow][randomCol] === 0 && board[randomRow][randomCol + 1] === 0) {
      // Sprawdź, czy można umieścić dwa sąsiednie pola z wartością "value" w tym miejscu
      let canPlace = true;

      for (const [dx, dy] of directions) {
        for (let i = 0; i < 2; i++) {
          const newRow = randomRow + dx;
          const newCol = randomCol + i * dy;

          if (
            newRow < 0 ||
            newRow >= 10 ||
            newCol < 0 ||
            newCol >= 10 ||
            (board[newRow][newCol] !== 0 && board[newRow][newCol] !== value)
          ) {
            canPlace = false;
            break;
          }
        }
      }

      if (canPlace) {
        // Umieść dwa sąsiednie pola z wartością "value" otoczone polami "0"
        for (let i = 0; i < 2; i++) {
          board[randomRow][randomCol + i] = value;
        }
        break; // Zakończ pętlę po umieszczeniu dwóch pól "value"
      }
    }
  }
}



placeSet(2, 1, randomBoard);
placeTwoAdjacent(randomBoard, 1);
placeTwoAdjacent(randomBoard, 1);
 // Dwa zestawy po 2 jednki


  const [board, setBoard] = useState(randomBoard);

  const columnHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rowHeaders = Array.from({ length: 11 }, (_, i) => i+1);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][columnIndex] = 2; // Ustaw odpowiedni stan, np. 2 oznacza pudło
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
                data-coordinates={`(${columnHeaders[columnIndex]}, ${rowIndex+1})`} // Przekazanie współrzędnych
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
