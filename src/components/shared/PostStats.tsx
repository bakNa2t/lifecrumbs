import React, { useState } from "react";
import { Models } from "appwrite";

import {
  useDeleteSavedPostMutation,
  useGetCurrentUserQuery,
  useLikePostMutation,
  useSavePostMutation,
} from "@/lib/react-query/queriesAndMutations";
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

  const { data: currentUser } = useGetCurrentUserQuery();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);

    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.$id === post.$id
    );

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

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
