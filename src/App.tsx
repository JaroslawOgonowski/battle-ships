import { Board } from "./Board";

function App() {
  const initialBoard: number[][] = [];
  for (let i = 0; i < 10; i++) {
    initialBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      initialBoard[i][j] = 0;
    }
  }

  return (
    <div>
      <Board boardArray={initialBoard} />
    </div>
  );
}

export default App;
