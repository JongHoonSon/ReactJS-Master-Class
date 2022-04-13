import React from "react";
import { useForm } from "react-hook-form";
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

interface IForm {
  category: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const handleValid = (data: IForm) => {
    setCategories((oldCategories) => [
      { text: data.category },
      ...oldCategories,
    ]);
    setValue("category", "");
  };
  // console.log(categories);
  // console.log("category", category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", {
            required: "Please write a Text",
          })}
          placeholder="Add category"
        />
        <button>Add category</button>
      </form>
      <select value={category.text} onInput={onInput}>
        {categories.map((ct) => (
          <option value={ct.text}>{ct.text}</option>
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
