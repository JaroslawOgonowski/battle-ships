import styled from "styled-components";

export const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
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
`