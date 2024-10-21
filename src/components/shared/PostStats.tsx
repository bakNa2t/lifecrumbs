import React, { useEffect, useState } from "react";
import { Models } from "appwrite";

import Loader from "./Loader";

import {
  useDeleteSavedPostMutation,
  useGetCurrentUserQuery,
  useLikePostMutation,
  useSavePostMutation,
} from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/hooks/use-toast";
import { checkIsLiked } from "@/lib/utils";

type PostStatProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const { mutate: likePost } = useLikePostMutation();
  const { mutate: savePost, isPending: isSavingPost } = useSavePostMutation();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPostMutation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post?.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);

      toast({
        title: "You have unliked this post",
        variant: "filled",
      });
    } else {
      newLikes.push(userId);

      toast({
        title: "You have liked this post",
        variant: "filled",
      });
    }

    setLikes(newLikes);

    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      toast({
        title: "Post has been removed from your Saved",
        variant: "filled",
      });
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
      toast({ title: "Post has been added to your Saved", variant: "filled" });
    }
  };

  return (
    <div className="flex justify-between items-start z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/like-heart-filled.svg"
              : "/assets/icons/like-heart-empty.svg"
          }
          alt="heart"
          width={22}
          height={22}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader wdth={20} hgt={20} />
        ) : (
          <img
            src={
              isSaved
                ? "/assets/icons/savemark-filled.svg"
                : "/assets/icons/sidebar/savemark.svg"
            }
            alt="savemark"
            width={22}
            height={22}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
