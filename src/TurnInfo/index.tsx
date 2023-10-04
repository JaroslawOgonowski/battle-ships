import { Turn, Wrapper } from "./styled";

type TurnInfoProps = {
  yourTurn: boolean;
  turnInfoTxt: string;
};

export const TurnInfo: React.FC<TurnInfoProps> = ({ yourTurn, turnInfoTxt }) => {
  return (
    <>
      <Wrapper>
      <Turn>Last turn:<br/>{yourTurn ? "Oponent Turn" : "Your Turn"}</Turn>
      {turnInfoTxt}
        <Turn>Now:<br/>{yourTurn ? "Your Turn" : "Oponent Turn"}</Turn>
        </Wrapper>
    </>
  );
};
