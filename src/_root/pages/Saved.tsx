import { Models } from "appwrite";

import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

import { useGetCurrentUserQuery } from "@/lib/react-query/queriesAndMutations";
import useMobileScreen from "@/hooks/useMobileScreen";

const Saved = () => {
  const { wdth, hgt } = useMobileScreen();
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
          src="/assets/icons/savemark-filled.svg"
          width={32}
          height={32}
          alt="savemark"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader wdth={wdth} hgt={hgt} />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl  gap-8">
          {savePosts.length === 0 ? (
            <p className="text-light-4">Posts not found</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
