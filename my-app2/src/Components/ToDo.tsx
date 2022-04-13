import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newTodo = { text, id, category: name as any };
      console.log(targetIndex);
      console.log(oldToDo);
      console.log(newTodo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      return oldToDos.filter((todo) => todo.id !== id);
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((category) => (
        <button name={category.text} onClick={onClick}>
          {category.text}
        </button>
      ))}
      <button onClick={handleDelete}>DELETE</button>
    </li>
  );
}

export default ToDo;
