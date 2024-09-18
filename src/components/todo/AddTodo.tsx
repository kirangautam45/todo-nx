import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../../state/recoil/atoms';

const AddTodo = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    if (inputValue.trim() === '') {
      setError("Todo list can't be empty");
      return;
    }

    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: Math.random().toString(36).substr(2, 9),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <>
      <div className="flex flex-row items-center lg:w-1/2 w-full m-2 mt-4 p-2 border-y mb-20 ">
        <div className="size-6 mr-4 border-2 border-purple-600 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="flex items-center justify-center text-3xl font-bold mb-1 text-white">
            +
          </span>
        </div>

        <input
          type="text"
          autoFocus
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          className=" p-2 lg:w-full w-9/12  outline-none focus:outline-none active:outline-none text-[16px] "
          placeholder="memorize the dictionary"
        />

        <button
          className="bg-purple-600 w-[130px] text-white px-4 py-2 mr-1 rounded font-semibold text-[14px]"
          onClick={addItem}
        >
          Add Items
        </button>
      </div>
      {error && <div className="text-red-600 text-sm mt-2 ">{error}</div>}
    </>
  );
};

export default AddTodo;
