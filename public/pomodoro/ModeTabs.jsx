import { useTimer } from "../context/TimerContext";
export default ModeTabs;

function ModeTabs() {
  const { state, dispatch } = useTimer();
  const modes = ["pomodoro", "short", "long"];

  return (
    <div className="flex gap-6 bg-[#21264b] p-2 rounded-full">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => dispatch({ type: "SET_MODE", payload: m })}
          className={`px-4 py-2 rounded-full capitalize transition
            ${
              state.mode === m
                ? "bg-tomato text-navy"
                : "text-gray-300 hover:text-white"
            }`}
        >
          {m.replace(/short/, "short break").replace(/long/, "long break")}
        </button>
      ))}
    </div>
  );
}
