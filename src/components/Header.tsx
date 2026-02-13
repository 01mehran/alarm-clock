// Image;
import clock from '../assets/images/clock.png';

function Header() {
  return (
    // images
    <header>
      <figure className="mx-auto w-44">
        <img
          src={clock}
          alt="Alarm clock"
          className="h-full w-full object-cover"
        />
      </figure>
    </header>
  );
}

export default Header;
