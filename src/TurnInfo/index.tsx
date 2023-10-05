import { Content, Turn, Wrapper } from "./styled";

type TurnInfoProps = {
  yourTurn: boolean;
  turnInfoTxt: string;
  turnInfoState: string;
};

export const TurnInfo: React.FC<TurnInfoProps> = ({
  yourTurn,
  turnInfoTxt,
  turnInfoState,
}) => {
  return (
    <>
      <Wrapper>
        <Turn>
          Last turn:
          <br />
          {yourTurn ? "Oponent Turn" : "Your Turn"}
        </Turn>
        <Content>
          <div>{turnInfoTxt}</div>
          {turnInfoState}
        </Content>
        <Turn>
          Now:
          <br />
          {yourTurn ? "Your Turn" : "Oponent Turn"}
          
          <div>{turnInfoTxt}</div>
          {turnInfoState}
        </Turn>
      </Wrapper>
    </>
  );
};
