
import { useState } from "react";
import { createPortal } from "react-dom";
import { Settings } from "lucide-react";
import { useTimer } from "../context/TimerContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SettingsModal() {
  const { state, dispatch } = useTimer();
  const [open, setOpen] = useState(false);


  const [times, setTimes] = useLocalStorage(
    "pomodoro-times",
    state.durations
  );

  const [localTimes, setLocalTimes] = useState(times);

  function handleApply(e) {
    e.preventDefault();

    setTimes(localTimes);
    dispatch({ type: "UPDATE_DURATIONS", payload: localTimes });

    setOpen(false);
  }

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="mt-10 opacity-60 hover:opacity-100 transition"
        aria-label="Configurações"
      >
        <Settings size={24} />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-[90%] max-w-md p-8 shadow-2xl text-navy">
              <header className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest">
                  Settings
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl leading-none hover:text-tomato"
                  aria-label="Fechar"
                >
                  &times;
                </button>
              </header>


              <form onSubmit={handleApply} className="space-y-8">

                <section>
                  <h3 className="mb-3 font-semibold tracking-wide text-sm uppercase">
                    Time (minutes)
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {["pomodoro", "short", "long"].map((m) => (
                      <div key={m} className="space-y-1">
                        <label
                          htmlFor={m}
                          className="block text-xs uppercase text-gray-500"
                        >
                          {m === "pomodoro"
                            ? "Pomodoro"
                            : m === "short"
                            ? "Short break"
                            : "Long break"}
                        </label>
                        <input
                          id={m}
                          type="number"
                          min="1"
                          max="120"
                          required
                          value={localTimes[m]}
                          onChange={(e) =>
                            setLocalTimes({
                              ...localTimes,
                              [m]: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-lg bg-gray-200 py-2 text-center focus:outline-none focus:ring-2 focus:ring-tomato"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <button
                  type="submit"
                  className="w-full py-3 bg-tomato text-white rounded-lg uppercase tracking-widest hover:opacity-90 transition"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
