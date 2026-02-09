// images
import clock from '../assets/images/clock.png';

function Home() {
  return (
    <main className="flex h-dvh items-center justify-center bg-blue-400">
      <div className="flex h-110 w-full max-w-120 flex-col items-center justify-around rounded-2xl bg-white p-6">
        <article className="mx-auto w-44">
          <img
            src={clock}
            alt="ringtone-clock"
            className="h-full w-full object-cover"
          />
        </article>

        <time className="text-[2.5rem] font-medium">00 : 00 : 00</time>

        <article className="flex w-full space-x-2">
          <div className="control-wrapper">
            <select className="selectEl">
              <option value="Hour" selected hidden>
                Hour
              </option>
            </select>
          </div>

          <div className="control-wrapper">
            <select className="selectEl">
              <option value="Minutes" selected hidden>
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
