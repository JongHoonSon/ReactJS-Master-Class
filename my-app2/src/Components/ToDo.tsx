import { IToDo } from "../atoms";

function ToDo({ text, category }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && <button>Doing</button>}
      {category !== "TO_DO" && <button>To Do</button>}
      {category !== "DONE" && <button>Done</button>}
    </li>
  );
}

export default ToDo;
