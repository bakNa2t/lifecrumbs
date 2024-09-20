import PostForm from "@/components/forms/PostForm";

const EditPost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-2 justify-start w-full">
          <img src="/assets/icons/edit.svg" alt="edit" width={32} height={32} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  );
};

export default EditPost;
