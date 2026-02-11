// Hooks
import { useEffect, useRef, useState } from 'react';

// Utils;
import { FormatTime } from '../utils/FormatTime';

// images
import clock from '../assets/images/clock.png';
import TimeSelect from '../components/TimeSelect';

function Home() {
  const [time, setTime] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMinutes, setSelectedMinutes] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const [alarmSet, setAlarmSet] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // current time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      const hours = FormatTime(date.getHours());
      const minutes = FormatTime(date.getMinutes());
      const seconds = FormatTime(date.getSeconds());

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
    if (alarmSet) {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
      setAlarmSet(false);
      return;
    }

    if (!selectedHour || !selectedMinutes) {
      setMsg('Select your alarm time!');

      setTimeout(() => {
        setMsg('');
      }, 2000);

      return;
    }
    setAlarmSet(true);
  }

  return (
    <main className="small:px-0 flex h-dvh items-center justify-center bg-blue-400 px-2">
      <section className="relative flex h-110 w-full max-w-120 flex-col items-center justify-around rounded-lg bg-white p-3 sm:p-6">
        <header>
          <figure className="mx-auto w-44">
            <img
              src={clock}
              alt="Alarm clock"
              className="h-full w-full object-cover"
            />
          </figure>
        </header>

        <time
          dateTime={time.replace(/\s/g, '')}
          className="w-full text-center text-[2.5rem] font-medium"
        >
          {time || '-- :-- :--'}
        </time>

        <article className="flex w-full space-x-2">
          {/* Hours */}

          <TimeSelect
            onChange={setSelectedHour}
            type="hour"
            disabled={alarmSet}
            value={selectedHour}
          />

          {/* Minutes */}
          <TimeSelect
            onChange={setSelectedMinutes}
            type="minutes"
            value={selectedMinutes}
            disabled={alarmSet}
          />
        </article>

        <button
          onClick={handleSetAlarm}
          className={`${alarmSet ? 'bg-red-500' : 'bg-blue-500'} w-full transform cursor-pointer rounded-sm border-0 py-2 text-xl text-white outline-0 transition-all duration-200 hover:translate-y-px`}
        >
          {alarmSet ? 'Stop alarm' : 'Set alarm'}
        </button>

        <audio ref={audioRef}>
          <source src="/ringtone.mp3" type="audio/mpeg" />
        </audio>

        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 transform text-[12px] font-medium tracking-wide text-nowrap text-red-500 sm:text-sm">
          {msg}
        </span>
      </section>
    </main>
  );
}

export default Home;
