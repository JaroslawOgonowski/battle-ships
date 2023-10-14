import { MainTitle } from "../GameField/styled";
import { InterfaceButton } from "../GameInterface/styled";
import { EndGameMsgLose, EndGameMsgWin, Image, Wrapper } from "./styled";
import winImg from "./images/cruise-outline-svgrepo-com.svg";
import loseImg from "./images/ship-wreck-svgrepo-com.svg";
import { loseMsg, winMsg } from "./messages";
type EndGameProps = {
  yourTurn: boolean;
};

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
