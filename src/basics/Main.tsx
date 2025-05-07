simport { useCounter } from "./store";

const Main = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>
      <div className="flex gap-x-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={increment}
        >
          Increment.
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={decrement}
        >
          Decrement.
        </button>
      </div>
    </div>
  );
};

export default Main;
