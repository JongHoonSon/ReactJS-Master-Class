import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === "del") {
      console.log("welcome");
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination?.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoardCopy = [...allBoards[source.droppableId]];
          const taskObj = sourceBoardCopy[source.index];
          sourceBoardCopy.splice(source.index, 1);
          const destinationBoardCopy = [...allBoards[destination.droppableId]];
          destinationBoardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoardCopy,
            [destination.droppableId]: destinationBoardCopy,
          };
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Droppable droppableId="del">
          {(magic) => (
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "50px",
                bottom: "100px",
                backgroundColor: "rgba(0,0,0,0.5)",
                textAlign: "center",
              }}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              Delete Here
            </div>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
