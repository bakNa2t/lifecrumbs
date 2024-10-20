import { Link } from "react-router-dom";

const FooterDesc = () => {
  return (
    <div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-2 flex-center tiny-medium text-primary-500 gap-1">
      Copyright {new Date().getFullYear()}. Design by
      <Link
        to="https://github..com/bakna2t"
        target="_blank"
        rel="noreferrer"
        className="hover:transform hover:-translate-y-1 hover:text-light-4 duration-300"
      >
        _&#216;k
      </Link>
    </div>
  );
};

export default FooterDesc;
