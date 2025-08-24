import { useTimer } from "../context/TimerContext";
export default Controls;

function Controls() {
  const { state, dispatch } = useTimer();

  return (
    <div className="flex gap-6 items-center justify-center mt-10">
      <button
        onClick={() => dispatch({ type: "TOGGLE" })}
        className="uppercase tracking-widest"
      >
        {state.isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="opacity-40 text-sm hover:opacity-100"
      >
        Reset
      </button>
    </div>
  );
}
