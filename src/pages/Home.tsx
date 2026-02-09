// images
import clock from '../assets/images/clock.png';

function Home() {
  return (
    <main>
      <article>
        <img src={clock} alt="ringtone-clock" />
      </article>

      <time>00 : 00 : 00</time>

      <article>
        <select>
          <option value="Hour">Hour</option>
        </select>
        <select>
          <option value="Minutes">Minutes</option>
        </select>
      </article>

      <button>Set alarm</button>
    </main>
  );
}

export default Home;
