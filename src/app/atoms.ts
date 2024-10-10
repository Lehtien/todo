import { atom } from 'recoil';

export interface Todo {
  id: number;
  title: string;
  text: string;
  completed: boolean;
}

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});