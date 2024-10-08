import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

import { useGetCurrentUserQuery } from "@/lib/react-query/queriesAndMutations";
import useMobileScreen from "@/hooks/useMobileScreen";

const LikedPost = () => {
  const { wdth, hgt } = useMobileScreen();

  const { data: currentUser } = useGetCurrentUserQuery();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader wdth={wdth} hgt={hgt} />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPost;
