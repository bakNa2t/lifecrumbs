import { Link } from "react-router-dom";

const FooterDesc = () => {
  return (
    <div>
      Copyright {new Date().getFullYear()}. Design by{" "}
      <Link to="https://github..com/bakna2t" target="_blank" rel="noreferrer">
        _&#216;k
      </Link>
      .
    </div>
  );
};

export default FooterDesc;
