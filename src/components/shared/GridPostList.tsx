import { Link } from "react-router-dom";
import { Models } from "appwrite";

import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  sortOrder?: "asc" | "desc";
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  sortOrder,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  const sortedPosts = posts?.sort((a, b) => {
    if (sortOrder === "asc") {
      return (
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      );
    } else {
      return (
        new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
      );
    }
  });

  return (
    <ul className="grid-container">
      {sortedPosts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post-image"
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
