import { useGetCurrentUserQuery } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assests/icons/sidebar/savemark.svg"
          width={32}
          height={32}
          alt="savemark"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      <ul className="w-full flex justify-center max-w-5xl  gap-8">
        {savePosts}
      </ul>
    </div>
  );
};

export default Saved;
