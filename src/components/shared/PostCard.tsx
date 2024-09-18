import { Models } from "appwrite";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl || "assets/images/profile-default.svg"
              }
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
