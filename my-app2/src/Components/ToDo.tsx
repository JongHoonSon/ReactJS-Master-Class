import { IToDo } from "../atoms";

function ToDo({ text, category }: IToDo) {
  const onClick = (clickedCategory: IToDo["category"]) => {
    console.log("i wanna go to : ", clickedCategory);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
