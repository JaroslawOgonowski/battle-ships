import React, { useEffect, useRef, useState } from "react";
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
import mast1 from "./ships/1mast.png";
import mast2 from "./ships/2mast.png";
import mast3 from "./ships/3mast.png";
import mast4 from "./ships/4mast.png";
import mast5 from "./ships/5mast.png";

type BoardProps = {
  opponentBoard?: boolean;
  yourTurn: boolean;
  setYourTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setTurnInfoTxt: React.Dispatch<React.SetStateAction<string>>;
  setTurnInfoState: React.Dispatch<React.SetStateAction<string>>;
};

export const Board: React.FC<BoardProps> = ({
  opponentBoard,
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
  
  const shipsData = [
    { id: "1", src: mast1 },
    { id: "2", src: mast2 },
    { id: "3", src: mast3 },
    { id: "4", src: mast4 },
    { id: "5", src: mast5 },
    { id: "6", src: mast1 },
    { id: "7", src: mast1 },
    { id: "8", src: mast1 },
    { id: "9", src: mast2 },
  ];
  
  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (yourTurn === true && opponentBoard) {
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

  const opponentMove = () => {
    const updatedBoard = [...board];
    let hitCount = 0;
    let hitCoordinates: { row: number; col: number }[] = [];
    const availableMoves = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (updatedBoard[row][col].state === "Hit") {
          hitCount += 1;
          hitCoordinates.push({ row, col });
        }
        if (updatedBoard[row][col].state === "Initial") {
          availableMoves.push({ row, col });
        }
      }
    }

    if (hitCount === 0) {
      if (availableMoves.length === 0) {
        console.log("Brak dostępnych ruchów");
        return;
      }
    } else if (hitCount === 1) {
      const hitCoordinate = hitCoordinates[0];
      const directions = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ];
      availableMoves.length = 0;
      for (const [dx, dy] of directions) {
        const newRow = hitCoordinate.row + dy;
        const newCol = hitCoordinate.col + dx;
        if (
          newRow >= 0 &&
          newRow < 10 &&
          newCol >= 0 &&
          newCol < 10 &&
          updatedBoard[newRow][newCol].state === "Initial"
        ) {
          availableMoves.push({ row: newRow, col: newCol });
        }
      }
    } else if (hitCount > 1) {
      const commonRow = hitCoordinates.every(
        (coord) => coord.row === hitCoordinates[0].row
      )
        ? hitCoordinates[0].row
        : null;
      const commonCol = hitCoordinates.every(
        (coord) => coord.col === hitCoordinates[0].col
      )
        ? hitCoordinates[0].col
        : null;
      availableMoves.length = 0;
      if (commonRow !== null) {
        const minCol = Math.min(...hitCoordinates.map((coord) => coord.col));
        const maxCol = Math.max(...hitCoordinates.map((coord) => coord.col));
        if (
          minCol > 0 &&
          updatedBoard[commonRow][minCol - 1].state === "Initial"
        ) {
          availableMoves.push({ row: commonRow, col: minCol - 1 });
        }
        if (
          maxCol < 9 &&
          updatedBoard[commonRow][maxCol + 1].state === "Initial"
        ) {
          availableMoves.push({ row: commonRow, col: maxCol + 1 });
        }
      } else if (commonCol !== null) {
        const minRow = Math.min(...hitCoordinates.map((coord) => coord.row));
        const maxRow = Math.max(...hitCoordinates.map((coord) => coord.row));
        if (
          minRow > 0 &&
          updatedBoard[minRow - 1][commonCol].state === "Initial"
        ) {
          availableMoves.push({ row: minRow - 1, col: commonCol });
        }
        if (
          maxRow < 9 &&
          updatedBoard[maxRow + 1][commonCol].state === "Initial"
        ) {
          availableMoves.push({ row: maxRow + 1, col: commonCol });
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const { row: randomRow, col: randomColumn } = availableMoves[randomIndex];

    const clickedSquare = updatedBoard[randomRow][randomColumn];
    hitCheck(randomRow, randomColumn, updatedBoard, clickedSquare, setBoard);
    setBoard(updatedBoard);
    setTurnInfoTxt(`${columnHeaders[randomColumn]}${randomRow + 1}`);
    setTurnInfoState(`${updatedBoard[randomRow][randomColumn].state}`);
  };

  useEffect(() => {
    if (!yourTurn && !opponentBoard) {
      const timeoutId = setTimeout(() => {
        opponentMove();
        setYourTurn(true);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [yourTurn, opponentBoard]);

  useEffect(() => {
    const updateBrightness = () => {
      if (!opponentBoard && yourTurn) {
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
  }, [yourTurn, opponentBoard]);

  return (
    <SingleBoard>
      <Title>{opponentBoard ? "Attack stance" : "Defense stance"}</Title>
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
                    opponentBoard
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
      <Title>{!opponentBoard ? "Your fleet" : "Opponent fleet"}</Title>
      <Ships>
      {shipsData.map((ship) => (
    <ShipImage key={ship.id} src={ship.src} id={ship.id}/>
  ))}
      </Ships>
    </SingleBoard>
  );
};
