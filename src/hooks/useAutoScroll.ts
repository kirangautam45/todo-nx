import { useRef, useEffect } from 'react';
import { Todo } from 'src/types/Todo';

const useAutoScroll = (todoList: Todo[] = []) => {
  // Explicitly type the ref as an HTML element or null
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [todoList]);

  return lastElementRef;
};

export default useAutoScroll;
