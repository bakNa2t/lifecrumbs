import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { LikedPost } from "@/_root/pages";
import { Button } from "@/components/ui/button";

import { useUserContext } from "@/context/AuthContext";
import { useGetUserByIdQuery } from "@/lib/react-query/queriesAndMutations";
import useMobileScreen from "@/hooks/useMobileScreen";

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
  const { wdth, hgt } = useMobileScreen();

  const { data: currentUser } = useGetUserByIdQuery(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader wdth={wdth} hgt={hgt} />
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

            <div className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio !== null ? (
                currentUser.bio
              ) : (
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left opacity-50">
                  Bio info hasn't added yet
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 hover:bg-dark-2 px-5 text-light-1 flex-center gap-2 rounded-lg ${
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

            <div className={`${user.id === id && "hidden"} flex gap-2`}>
              <Button type="button" className="shad-button_dark_4">
                Back
              </Button>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src="/assets/icons/post-images.svg"
              alt="post"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src="/assets/icons/like-heart-empty.svg"
              alt="like"
              width={22}
              height={22}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts/" element={<LikedPost />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
