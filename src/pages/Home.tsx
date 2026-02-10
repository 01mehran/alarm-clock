// Hooks
import { useEffect, useRef, useState } from 'react';

// images
import clock from '../assets/images/clock.png';

function Home() {
  const [time, setTime] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMinutes, setSelectedMinutes] = useState<string>('');

  const [alarmSet, setAlarmSet] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // current time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      const hours = formatTime(date.getHours());
      const minutes = formatTime(date.getMinutes());
      const seconds = formatTime(date.getSeconds());

      setTime(`${hours} : ${minutes} : ${seconds}`);

      if (
        alarmSet &&
        hours === selectedHour &&
        minutes === selectedMinutes &&
        seconds === '00'
      ) {
        audioRef.current?.play();
      }
    };

    // updateTime();
    const interalTime = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interalTime);
    };
  }, [alarmSet, selectedHour, selectedMinutes]);

  function handleSetAlarm() {
    if (!selectedHour || !selectedMinutes) return;
    setAlarmSet(true);
  }

  return (
    <main className="small:px-0 flex h-dvh items-center justify-center bg-blue-400 px-2">
      <div className="flex h-110 w-full max-w-120 flex-col items-center justify-around rounded-2xl bg-white p-6">
        <article className="mx-auto w-44">
          <img
            src={clock}
            alt="ringtone-clock"
            className="h-full w-full object-cover"
          />
        </article>

        <time className="w-full text-center text-[2.5rem] font-medium">
          {time || '-- :-- :--'}
        </time>

        <article className="flex w-full space-x-2">
          {/* Hours */}
          <div className="control-wrapper">
            <select
              className="selectEl"
              onChange={(e) => setSelectedHour(e.target.value)}
              value={selectedHour}
            >
              <option defaultValue="Minutes" hidden>
                Hour
              </option>
              {Array.from({ length: 24 }, (_, i) => (
                <option value={i} key={i}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {/* Minutes */}
          <div className="control-wrapper">
            <select
              className="selectEl"
              onChange={(e) => setSelectedMinutes(e.target.value)}
              value={selectedMinutes}
            >
              <option defaultValue="Minutes" hidden>
                Minutes
              </option>
              {Array.from({ length: 60 }, (_, i) => (
                <option value={i} key={i}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </article>

        <button
          onClick={handleSetAlarm}
          className="w-full transform cursor-pointer rounded-sm bg-blue-500 py-2 text-xl text-white transition-all duration-200 hover:translate-y-px"
        >
          Set alarm
        </button>

        <audio ref={audioRef}>
          <source src="/ringtone.mp3" typeof="audio/mpeg" />
        </audio>
      </div>
    </main>
  );
}

export default Home;
