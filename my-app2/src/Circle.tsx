import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProp {
  bgColor: string;
}

function Circle({ bgColor }: CircleProp) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;
//
