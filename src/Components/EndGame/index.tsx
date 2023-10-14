import { MainTitle } from "../GameField/styled";
import { InterfaceButton } from "../GameInterface/styled";
import { EndGameMsgLose, EndGameMsgWin, Image, Wrapper } from "./styled";
import winImg from "./images/cruise-outline-svgrepo-com.svg";
import loseImg from "./images/ship-wreck-svgrepo-com.svg";
type EndGameProps = {
  yourTurn: boolean;
};

const loseMsg = [
  "Your opponent smeared you across the board.",
  "You have been completely destroyed.",
  "Your strategy has failed.",
  "Your resistance was pointless.",
  "Your ships will serve as a coral reef.",
  "This ship has already sailed...",
  "It wasn't friendShip...",
  "Your fleet has been annihilated. Better luck next time!",
  "Defeat is bitter, but it's a chance to learn and come back stronger.",
  "Your opponent's cunning strategy led to your downfall.",
  "It's a tough loss, but remember, every great captain faces setbacks.",
  "The sea can be unforgiving. Your ships lie in ruins.",
];

const winMsg = [
  "You sank all of your opponent's ships! Congratulations, you win!",
  "Victory is yours! You've outsmarted your opponent and won the game.",
  "A stellar performance! Your strategic brilliance leads you to victory!",
  "You're the captain of the high seas! You've won the battle and the war.",
  "Your naval expertise shines through. You've emerged victorious!",
  "It's a triumph! You've achieved a decisive victory in this naval clash.",
  "You've conquered the seas and emerged as the ultimate naval commander.",
  "A resounding victory! Your opponent's ships are nothing but debris now.",
  "It's a clear win! Your opponent's fleet is no match for your skill.",
  "You've proven yourself as the master of the ocean. Victory is yours!",
];

const randomLoseIndex = Math.floor(Math.random() * loseMsg.length);
const randomWinIndex = Math.floor(Math.random() * winMsg.length);

function refreshPage() {
  window.location.reload();
}

export const Endgame: React.FC<EndGameProps> = ({ yourTurn }) => {

  return (
    <Wrapper>
      <MainTitle>📡 Battle ships ⚓</MainTitle>
      {!yourTurn ? (
        <EndGameMsgWin>You Win</EndGameMsgWin>
      ) : (
        <EndGameMsgLose>You Lose</EndGameMsgLose>
      )}
      {!yourTurn ? (
        <>
          <EndGameMsgWin>{winMsg[randomWinIndex]}</EndGameMsgWin>
          <Image src={winImg} />
        </>
      ) : (
        <>
          <EndGameMsgLose>{loseMsg[randomLoseIndex]}</EndGameMsgLose>
          <Image src={loseImg} />
        </>
      )}
      <InterfaceButton onClick={() => refreshPage()}>
        Play Again ⁜
      </InterfaceButton>
    </Wrapper>
  );
};
