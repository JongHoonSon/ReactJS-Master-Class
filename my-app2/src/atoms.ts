import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  text: string;
}

const basicCategories = [
  { text: "TO_DO" },
  { text: "DOING" },
  { text: "DONE" },
];

export const categoriesState = atom<ICategory[]>({
  key: "categories",
  default: basicCategories,
});

export const categoryState = atom({
  key: "category",
  default: basicCategories[0].text,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("todo") || "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
