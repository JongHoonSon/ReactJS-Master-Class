import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="To_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {category === "TO_DO" &&
        toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DOING" &&
        doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DONE" &&
        done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
    </div>
  );
}

export default ToDoList;
