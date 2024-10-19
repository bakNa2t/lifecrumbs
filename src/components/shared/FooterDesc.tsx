import { Link } from "react-router-dom";

const FooterDesc = () => {
  return (
    <div className="absolute translate-x-1/2 bottom-2 flex-center tiny-medium text-primary-500 gap-1">
      Copyright {new Date().getFullYear()}. Design by
      <Link to="https://github..com/bakna2t" target="_blank" rel="noreferrer">
        _&#216;k
      </Link>
    </div>
  );
};

export default FooterDesc;
