import { InterfaceButton, Wrapper } from "./styled";

type GameInterfaceProps = {
  gameOn: boolean;
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameInterface: React.FC<GameInterfaceProps> = ({
  gameOn,
  setGameOn,
}) => {
  return (
    <Wrapper>
      <InterfaceButton>Start</InterfaceButton>
      <InterfaceButton>Reroll ships position</InterfaceButton>
    </Wrapper>
  );
};
