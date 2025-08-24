import { useTimer } from "../context/TimerContext";
import useCountdown from "../hooks/useCountdown";

const ACCENT = "#f87070";            

export default function CountdownCircle() {
  const { state } = useTimer();
  useCountdown();

  const total = state.durations[state.mode] * 60;
  const percentage = ((total - state.secondsLeft) / total) * 100;

  const minutes = String(Math.floor(state.secondsLeft / 60)).padStart(2, "0");
  const seconds = String(state.secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative w-72 h-72">

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${ACCENT} ${percentage}%, #1d1f39 ${percentage}% 100%)`,
        }}
      >
        <div className="absolute inset-6 bg-navy rounded-full flex items-center justify-center">
          <span className="text-5xl font-bold leading-none select-none">
            {minutes}:{seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
