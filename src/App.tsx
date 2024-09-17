import { useRecoilValue, useSetRecoilState } from 'recoil';
import './index.css';
import TodoItem from './component/todo/TodoItem';
import AddTodo from './component/todo/AddTodo';
import { todoListState } from './component/state/recoil/atoms';
import { motion } from 'framer-motion';
import useTodoAnimations from './component/hooks/useTodoAnimations';
import useAutoScroll from './component/hooks/useAutoScroll';
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
    <div className="container mx-auto">
      <h1 className="flex mt-20 mb-10 lg:justify-start justify-center text-3xl font-bold text-black my-4">
        ToDo List
      </h1>
      <motion.div
        className="todo-list"
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
