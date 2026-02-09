// Hooks
import { useEffect, useState } from 'react';

// images
import clock from '../assets/images/clock.png';

function Home() {
  const [time, setTime] = useState<string>('');

  //   current time
  useEffect(() => {
    const formatTime = (num: number): string => {
      return num.toString().padStart(2, '0');
    };

    const updateTime = () => {
      const date = new Date();

      const hours = formatTime(date.getHours());
      const minutes = formatTime(date.getMinutes());
      const seconds = formatTime(date.getSeconds());

      setTime(`${hours} : ${minutes} : ${seconds}`);
    };

    updateTime();

    const interalTime = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interalTime);
    };
  }, []);

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
          <div className="control-wrapper">
            <select className="selectEl">
              <option value="" disabled style={{ display: 'none' }}>
                Hour
              </option>
            </select>
          </div>

          <div className="control-wrapper">
            <select className="selectEl">
              <option value="" disabled style={{ display: 'none' }}>
                Minutes
              </option>
            </select>
          </div>
        </article>

        <button className="w-full transform cursor-pointer rounded-sm bg-blue-500 py-2 text-xl text-white transition-all duration-200 hover:translate-y-px">
          Set alarm
        </button>
      </div>
    </main>
  );
}

export default Home;
