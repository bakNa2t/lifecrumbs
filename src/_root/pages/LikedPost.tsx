import Loader from "@/components/shared/Loader";
import { useGetCurrentUserQuery } from "@/lib/react-query/queriesAndMutations";

const LikedPost = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
    </>
  );
};

export default LikedPost;
