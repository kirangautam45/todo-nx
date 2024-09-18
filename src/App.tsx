import { useRecoilValue, useSetRecoilState } from 'recoil';
import './index.css';
import TodoItem from './components/todo/TodoItem';
import AddTodo from './components/todo/AddTodo';
import { todoListState } from './state/recoil/atoms';
import { motion } from 'framer-motion';
import useTodoAnimations from './hooks/useTodoAnimations';
import useAutoScroll from './hooks/useAutoScroll';
import { Todo } from './types/Todo';

function App() {
  const { container, item } = useTodoAnimations();
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const lastTodoRef = useAutoScroll(todoList);

  const toggleComplete = (id: string) => {
    setTodoList((oldTodoList: Todo[]) =>
      oldTodoList.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodoList((oldTodoList) => oldTodoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto max-h-4/6 overflow-y-auto overflow-x-hidden ">
      <h1 className="flex mt-20 mb-10 lg:justify-start justify-center text-3xl font-bold text-black my-4">
        ToDo List
      </h1>
      <motion.div
        className=""
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {todoList.map((todo: Todo, index: number) => (
          <motion.div
            key={todo.id}
            variants={item}
            ref={index === todoList.length - 1 ? lastTodoRef : null}
          >
            <TodoItem
              text={todo.text}
              isComplete={todo.isComplete}
              toggleComplete={() => toggleComplete(todo.id)}
              removeTodo={() => removeTodo(todo.id)}
            />
          </motion.div>
        ))}
      </motion.div>
      <AddTodo />
    </div>
  );
}

export default App;
