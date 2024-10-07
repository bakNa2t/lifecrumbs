import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";

import useMobileScreen from "@/hooks/useMobileScreen";
import { useToast } from "@/hooks/use-toast";
import { useGetUsersQuery } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { toast } = useToast();
  const { wdth, hgt } = useMobileScreen();

  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsersQuery();

  if (isErrorCreators) {
    toast({
      title: "Something went wrong, please try again",
    });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All users</h2>
        {isLoading && !creators ? (
          <Loader wdth={wdth} hgt={hgt} />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => {
              return (
                <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                  <UserCard user={creator} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
