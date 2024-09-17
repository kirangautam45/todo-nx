import { atom } from 'recoil';
import { Todo } from 'src/types/Todo';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [
    { id: '1', text: 'Milk', isComplete: false },
    { id: '2', text: 'Eggs', isComplete: false },
    { id: '3', text: 'Cheese', isComplete: false },
  ],
});
