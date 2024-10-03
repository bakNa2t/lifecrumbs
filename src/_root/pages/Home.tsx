import { Models } from "appwrite";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";

import {
  useGetRecentPostsQuery,
  useGetUsersQuery,
} from "@/lib/react-query/queriesAndMutations";
import UserCard from "@/components/shared/UserCard";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    /*isError: isErrorPosts,*/
  } = useGetRecentPostsQuery();

  const {
    data: creators,
    isPending: isUserLoading,
    // isError: isErrorCreators,
  } = useGetUsersQuery(5);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-8 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Recent Creators</h3>

        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-4">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
