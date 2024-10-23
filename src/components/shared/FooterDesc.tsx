import { Link } from "react-router-dom";

const FooterDesc = () => {
  return (
    <div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-2 flex-center tiny-medium text-dark-4 dark:text-light-4  gap-1">
      &copy; Copyright {new Date().getFullYear()}. Design by
      <Link
        to="https://github.com/bakna2t"
        target="_blank"
        rel="noreferrer"
        className="hover:transform hover:-translate-y-1 hover:text-bright-4 dark:hover:text-light-1 duration-300 hover:drop-shadow-dusk_shadow dark:hover:drop-shadow-light_shadow"
      >
        _&#216;k
      </Link>
    </div>
  );
};

export default FooterDesc;
