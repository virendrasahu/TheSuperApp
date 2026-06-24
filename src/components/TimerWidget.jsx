import { useEffect, useMemo, useState } from "react";

const initialDuration = {
  hours: 5,
  minutes: 9,
  seconds: 0,
};

function toSeconds(duration) {
  return duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
}

function fromSeconds(total) {
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function twoDigits(value) {
  return String(value).padStart(2, "0");
}

export default function TimerWidget() {
  const [duration, setDuration] = useState(initialDuration);
  const [remaining, setRemaining] = useState(toSeconds(initialDuration));
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  const remainingParts = fromSeconds(remaining);
  const total = toSeconds(duration) || 1;
  const progress = useMemo(() => {
    return Math.max(0, Math.min(100, (remaining / total) * 100));
  }, [remaining, total]);

  function changeUnit(key, direction) {
    setFinished(false);
    setDuration((current) => {
      const limits = key === "hours" ? 23 : 59;
      const nextValue = Math.max(0, Math.min(limits, current[key] + direction));
      const next = { ...current, [key]: nextValue };
      setRemaining(toSeconds(next));
      setRunning(false);
      return next;
    });
  }

  function startPause() {
    if (remaining === 0) {
      setRemaining(toSeconds(duration));
      setFinished(false);
    }
    setRunning((value) => !value);
  }

  function reset() {
    setRunning(false);
    setFinished(false);
    setRemaining(toSeconds(duration));
  }

  return (
    <section className="timer-card">
      <div
        className="timer-card__dial"
        style={{
          background: `conic-gradient(#ff6573 ${progress}%, #1a1b35 ${progress}% 100%)`,
        }}
      >
        <div>
          {twoDigits(remainingParts.hours)}:{twoDigits(remainingParts.minutes)}:
          {twoDigits(remainingParts.seconds)}
        </div>
      </div>
      <div className="timer-card__controls">
        <div className="timer-card__units">
          {["hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="timer-card__unit">
              <span>{unit[0].toUpperCase() + unit.slice(1)}</span>
              <button type="button" onClick={() => changeUnit(unit, 1)} aria-label={`Increase ${unit}`}>
                ▲
              </button>
              <strong>{twoDigits(duration[unit])}</strong>
              <button type="button" onClick={() => changeUnit(unit, -1)} aria-label={`Decrease ${unit}`}>
                ▼
              </button>
            </div>
          ))}
        </div>
        <div className="timer-card__actions">
          <button type="button" onClick={startPause}>
            {running ? "Pause" : remaining === 0 ? "Restart" : "Start"}
          </button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
        {finished && <p className="timer-card__done">Timer complete.</p>}
      </div>
    </section>
  );
}
