import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinkIcons } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { /*mutate: signOutAccount,*/ isSuccess } = useSignOutAccountMutation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-10">
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

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "assets/images/profile-default.svg"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@${user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-5">
          {sidebarLinkIcons.map((link: INavLink) => {
            return (
              <li className="leftsidebar-link" key={link.label}>
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover:invert-white"
                    width={24}
                    height={24}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
