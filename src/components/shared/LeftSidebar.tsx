import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "../ui/button";

import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinkIcons } from "@/constants";
import { INavLink } from "@/types";
import ThemeBtn from "./ThemeBtn";
import FooterDesc from "./FooterDesc";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar relative">
      <div className="flex flex-col gap-10">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/assets/images/logo-lifecrumbs.png"
              alt="Logo"
              className="w-12 h-12 shadow-shd-logo rounded-full"
            />
            <span className="text-3xl font-semibold">Lifecrumbs</span>
          </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "assets/icons/profile-default.svg"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@${user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-2">
          {sidebarLinkIcons.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-3"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
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

      <div className="flex-between">
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => signOutAccount()}
        >
          <img
            src="/assets/icons/logout.svg"
            width={26}
            height={26}
            alt="logout"
          />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>

        <ThemeBtn
          type="button"
          className="p-1 w-12 h-12 duration-300 ease-linear bg-transparent hover:bg-bright-1 hover:dark:bg-dark-4 rounded-full"
        />
      </div>

      <FooterDesc />
    </nav>
  );
};

export default LeftSidebar;
