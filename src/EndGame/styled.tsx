import styled from "styled-components";

export const Wrapper = styled.main`
  margin: 20vh auto;
  width: 50%;
  height: 50vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const EndGameMsgWin = styled.div`
  width: 100%;
  text-align: center;
  margin: 2vh 0 2vh 0;
  font-size: 2vw;
  color: #32b012;
`;
export const EndGameMsgLose = styled(EndGameMsgWin)`
  color: #81090d;
`;
