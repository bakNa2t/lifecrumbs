import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ThemeBtn from "./ThemeBtn";
import { Button } from "../ui/button";

import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();

  const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/assets/images/logo-lifecrumbs.png"
              alt="Logo"
              className="w-10 h-10 shadow-shd-logo rounded-full"
            />
            <span className="text-2xl md:text-3xl font-semibold">
              Lifecrumbs
            </span>
          </div>
        </Link>

        <div className="flex gap-2">
          <Button
            // variant="ghost"
            size="icon"
            className="shad-button_ghost !justify-center"
            onClick={() => signOutAccount()}
          >
            <img
              src="/assets/icons/logout.svg"
              width={24}
              height={24}
              alt="logout"
            />
          </Button>

          <ThemeBtn sz="icon" />

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "assets/icons/profile-default.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full mx-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
