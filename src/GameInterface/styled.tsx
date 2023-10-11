import styled from "styled-components";

export const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  
  @media (max-width: 1100px) {
    margin-top: -5vh;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`

export const InterfaceButton =  styled.button`
cursor: pointer;
  border: none;
  font-family: 'VT323', monospace;
  background: none;
  color: #208811f8;
  font-size: 2vw;  
  transition: 500ms;

  &:hover{
    color: #34de1af8;
  }

  @media (max-width: 900px) {
    font-size: 18px;
  }
`