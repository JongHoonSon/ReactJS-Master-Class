import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: ICategory;
}

export interface ICategory {
  text: string;
}

export const categoriesState = atom<ICategory[]>({
  key: "categories",
  default: [{ text: "TO_DO" }, { text: "DOING" }, { text: "DONE" }],
});

export const categoryState = atom<ICategory>({
  key: "category",
  default: { text: "TO_DO" },
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
