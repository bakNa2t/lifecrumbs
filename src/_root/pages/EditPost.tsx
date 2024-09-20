import { useParams } from "react-router-dom";

import PostForm from "@/components/forms/PostForm";
import { useGetPostByIdQuery } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostByIdQuery(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-2 justify-start w-full">
          <img src="/assets/icons/edit.svg" alt="edit" width={32} height={32} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm post={post} action="Edit" />
      </div>
    </div>
  );
};

export default EditPost;
