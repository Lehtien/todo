import { atom } from 'recoil';
import { TodoData } from './types/todo';

export const todosState = atom<TodoData[]>({
  key: 'todosState',
  default: [],
});

export const todoFormState = atom({
  key: 'todoFormState',
  default: {
    title: '',
    text: '',
  },
});

export const todoFormErrorState = atom({
  key: 'todoFormErrorState',
  default: '',
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});