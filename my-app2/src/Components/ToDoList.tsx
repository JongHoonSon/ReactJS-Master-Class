import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoriesState,
  categoryState,
  ICategory,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // console.log(categories);
  // console.log("category", category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category.text} onInput={onInput}>
        {categories.map((category) => (
          <option value={category.text}>{category.text}</option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
