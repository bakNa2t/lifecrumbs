import { Link, useLocation } from "react-router-dom";

import { bottombarLinkIcons } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinkIcons.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            to={link.route}
            className={`${
              isActive && "bg-primary-500 rounded-[10px] "
            } flex-center flex-col gap-1 p-2 transition`}
            key={link.label}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${isActive && "invert-white"}`}
              width={24}
              height={24}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
