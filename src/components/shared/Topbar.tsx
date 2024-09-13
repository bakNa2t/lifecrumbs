import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Topbar = () => {
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="text-3xl font-semibold">Lifecrumbs</span>
          </div>
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost">
            <img
              src="/assets/icons/logout.svg"
              width={26}
              height={26}
              alt="logout"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
