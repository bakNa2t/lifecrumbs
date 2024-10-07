// import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

import useMobileScreen from "@/hooks/useMobileScreen";

type searchResultsProps = {
  isSearchFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchedPosts: any;
  // searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: searchResultsProps) => {
  const { wdth, hgt } = useMobileScreen();

  if (isSearchFetching) return <Loader wdth={wdth} hgt={hgt} />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No posts found</p>
  );
};

export default SearchResults;
