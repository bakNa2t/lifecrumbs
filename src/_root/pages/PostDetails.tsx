import { Link, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";

import { useUserContext } from "@/context/AuthContext";
import { useGetPostByIdQuery } from "@/lib/react-query/queriesAndMutations";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostByIdQuery(id || "");
  const { user } = useUserContext();

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "assets/icons/profile-default.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt ?? "")}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-3">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  variant={"ghost"}
                  className={`ghost_details-delete_btn p-0 ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete-post.svg"
                    alt="delete-post"
                    width={27}
                    height={27}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="small-medium lg:base-medium py-5">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li className="text-light-3" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
