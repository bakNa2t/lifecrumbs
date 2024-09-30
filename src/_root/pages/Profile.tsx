import { Link, useLocation, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";

import { useUserContext } from "@/context/AuthContext";
import { useGetUserByIdQuery } from "@/lib/react-query/queriesAndMutations";
import { Button } from "@/components/ui/button";

interface StatBlockProp {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProp) => {
  return (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserByIdQuery(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-default.svg"}
            alt="profile"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={0} label="Followers" />
              <StatBlock value={0} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio !== null ? (
                currentUser.bio
              ) : (
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left opacity-50">
                  Bio info hasn't added yet
                </p>
              )}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit profile
                </p>
              </Link>
            </div>

            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shard-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4"></div>
    </div>
  );
};

export default Profile;
