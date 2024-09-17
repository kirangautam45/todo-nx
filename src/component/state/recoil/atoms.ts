import { atom } from 'recoil'

export type Todo = {
  id: string
  text: string
  isComplete: boolean
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [
    { id: '1', text: 'Milk', isComplete: false },
    { id: '2', text: 'Eggs', isComplete: false },
    { id: '3', text: 'Cheese', isComplete: false },
  ],
})
