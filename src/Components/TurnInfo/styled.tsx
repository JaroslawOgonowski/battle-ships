import styled from "styled-components";

export const Wrapper = styled.div`
  width: 20%;
  height: 60vh;
  background-color: black;
  align-self: flex-start;
  color: #4ae014;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  margin-top: 6vh;
  @media (max-width: 1100px) {
    order: 1;
    min-width: 80%;
    height: auto;
    padding-bottom: 2vh;
    align-self: center;
  }
`;

export const Turn = styled.h2`
  width: 100%;
  text-align: center;
  margin: 1vh 0 0 0;
  padding: 0;
  font-size: 2vw;

  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
`;
