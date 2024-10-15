import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
} from "@/lib/react-query/queriesAndMutations";
import GridPostList from "@/components/shared/GridPostList";
import useMobileScreen from "@/hooks/useMobileScreen";
import useMoveBack from "@/hooks/useMoveBack";

const PostDetails = () => {
  const navigate = useNavigate();
  const toBack = useMoveBack();
  const { id } = useParams();
  const { user } = useUserContext();
  const { wdth, hgt } = useMobileScreen();

  const { data: post, isPending } = useGetPostByIdQuery(id || "");
  const { data: userPosts, isPending: isUserPostLoading } =
    useGetUserPostsQuery(post?.creator.$id);

  const { mutate: deletePost } = useDeletePostMutation();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({
      postId: id ?? "",
      imageId: post?.imageId,
    });

    return navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          type="button"
          className="shad-button_dark_4 active:translate-y-[-2px] hover:shadow-lg hover:shadow-light-3"
          onClick={toBack}
        >
          <img src="/assets/icons/back.svg" alt="back" width={20} height={20} />
          Back
        </Button>
      </div>

      {isPending ? (
        <Loader wdth={wdth} hgt={hgt} />
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
                  <p className="base-medium lg:body-bold text-light-1 dark:text-dusk-2">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt ?? "")}
                    </p>
                    •
                    <p className="flex gap-1 subtle-semibold lg:small-regular">
                      {post?.location && (
                        <img
                          src="/assets/icons/map-pin.svg"
                          alt="location"
                          width={14}
                          height={14}
                        />
                      )}
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-3">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${
                    user.id !== post?.creator.$id && "hidden"
                  } hover:transform hover:scale-105 `}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  type="button"
                  className={`p-0 ${
                    user.id !== post?.creator.$id && "hidden"
                  } hover:transform hover:scale-105`}
                  onClick={handleDeletePost}
                >
                  <img
                    src="/assets/icons/delete-post.svg"
                    alt="delete-post"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li className="text-light-3 dark:text-dusk-2" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      {relatedPosts && relatedPosts?.length > 0 && (
        <div className="w-full max-w-5xl">
          <hr className="border w-full border-dark-4/80" />

          <h3 className="body-bold md:h3-bold w-full my-10">
            More Related Posts
          </h3>
          {isUserPostLoading || !relatedPosts ? (
            <Loader wdth={wdth} hgt={hgt} />
          ) : (
            <GridPostList posts={relatedPosts} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
