import { Models } from "appwrite";
import { useState } from "react";

import {
  useDeleteSavedPostMutation,
  useLikePostMutation,
  useSavePostMutation,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { checkIsLiked } from "@/lib/utils";

type PostStatProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePostMutation();
  const { mutate: savePost } = useSavePostMutation();
  const { mutate: deleteSavedPost } = useDeleteSavedPostMutation();

  const { data: currentUser } = useUserContext();

  const handleLikePost = () => {};

  const handleSavePost = () => {};

  return (
    <div className="flex justify-between items-start z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "assets/icons/like-heart-filled.svg"
              : "assets/icons/like-heart-empty.svg"
          }
          alt="heart"
          width={22}
          height={22}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="amall-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={
            isSaved
              ? "assets/icons/savemark-filled.svg"
              : "assets/icons/sidebar/savemark.svg"
          }
          alt="savemark"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
