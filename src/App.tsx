import { Board } from "./Board";

function App() {
  const initialBoard: { value: number; state: number }[][] = [];

  for (let i = 0; i < 10; i++) {
    initialBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      initialBoard[i][j] = { value: 0, state: 0 };
    }
  }

  return (
    <div>
      <Board boardArray={initialBoard} />
    </div>
  );
}

export default App;
