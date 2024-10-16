import { Link } from "react-router-dom";
import { Models } from "appwrite";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="user-card bg-bright-2 dark:bg-dark-2"
    >
      <img
        src={user.imageUrl || "/assets/icons/profile-default.svg"}
        alt="creator"
        className="rounded-full w-12 h-12"
      />

      <div className="flex-center flex-col gap-1 ">
        <p className="base-medium text-dusk-2 dark:text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="shad-button_primary px-5 hover:shadow-lg hover:shadow-light-3"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
