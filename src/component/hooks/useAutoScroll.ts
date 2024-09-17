import { useRef, useEffect } from 'react';
import { Todo } from '../state/recoil/atoms';

const useAutoScroll = (dependencies: Todo[] = []) => {
  // Explicitly type the ref as an HTML element or null
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [dependencies]); // Trigger the scroll when dependencies change (like todoList)

  return lastElementRef;
};

export default useAutoScroll;
