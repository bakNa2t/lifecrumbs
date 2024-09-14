import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

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
      </div>
    </nav>
  );
};

export default LeftSidebar;
