import { Link } from "react-router-dom";
import { Models } from "appwrite";

import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
};

const GridPostList = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post-image"
              className="w-full h-full object-cover"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
