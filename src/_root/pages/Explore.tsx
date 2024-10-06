import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui/input";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SelectBlock from "@/components/shared/SelectBlock";

import {
  useGetPostsQuery,
  useSearchPostsQuery,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");

  const { data: posts, fetchNextPage, hasNextPage } = useGetPostsQuery();

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPostsQuery(debouncedSearchValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldDisplaySearchResults = searchValue !== "";
  const shouldDisplayPosts =
    !shouldDisplaySearchResults &&
    posts?.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Post</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search post"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <img
              src="assets/icons/close.svg"
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold ">Last Popular Posts</h3>

        <SelectBlock
          options={[
            {
              value: "latest",
              label: "Latest",
              path: "/assets/icons/sort-desc.svg",
            },
            {
              value: "earliest",
              label: "Earliest",
              path: "/assets/icons/sort-asc.svg",
            },
          ]}
        />
      </div>

      <div className="flex flex-wrap gap-6 w-full max-w-5xl">
        {shouldDisplaySearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldDisplayPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            No posts found
          </p>
        ) : (
          posts.pages.map(
            (item, index) =>
              item && (
                <GridPostList key={`page-${index}`} posts={item.documents} />
              )
          )
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
