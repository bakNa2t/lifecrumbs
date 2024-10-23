import { Link } from "react-router-dom";
import { Models } from "appwrite";

import PostStats from "./PostStats";

import { convertFormatDate } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl || "assets/icons/profile-default.svg"
              }
              alt="creator"
              className="w-12 h-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-dusk-2 dark:text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {convertFormatDate(post.$createdAt)}
              </p>
              •
              <p className="flex gap-1 subtle-semibold lg:small-regular">
                {post.location && (
                  <img
                    src="/assets/icons/map-pin.svg"
                    alt="location"
                    width={14}
                    height={14}
                  />
                )}
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="overflow-hidden h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] mt-5">
          <img
            src={post.imageUrl || "assets/images/post-default.png"}
            alt="post image"
            className="post-card_img hover:scale-105 transition duration-500 linear"
          />
        </div>

        <div className="small-medium lg:base-medium pt-2 pb-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li className="text-light-3" key={tag}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
