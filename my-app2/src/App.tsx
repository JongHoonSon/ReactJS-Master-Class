import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
        whileDrag={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
      ></Box>
    </Wrapper>
  );
}

export default App;
