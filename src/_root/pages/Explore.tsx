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
import useMobileScreen from "@/hooks/useMobileScreen";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { wdth, hgt } = useMobileScreen();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPostsQuery();

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPostsQuery(debouncedSearchValue);

  const removeSearchValue = () => {
    setSearchValue("");
  };

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  useEffect(() => {
    if (posts) {
      const sortedPages = posts.pages.map((page) => {
        return {
          ...page,
          documents: page.documents.sort((a, b) => {
            if (sortOrder === "asc") {
              return (
                new Date(a.$createdAt).getTime() -
                new Date(b.$createdAt).getTime()
              );
            } else {
              return (
                new Date(b.$createdAt).getTime() -
                new Date(a.$createdAt).getTime()
              );
            }
          }),
        };
      });

      posts.pages = sortedPages;
    }
  }, [sortOrder, posts]);

  const handleSortOrderChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setSortOrder(value);
    }
  };

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader wdth={wdth} hgt={hgt} />
      </div>
    );
  }

  const shouldDisplaySearchResults = searchValue !== "";
  const shouldDisplayPosts =
    !shouldDisplaySearchResults &&
    posts?.pages.every(
      (item) => item && item.documents && item.documents.length === 0
    );

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Post</h2>
        <div className="flex gap-1 w-full rounded-lg bg-dark-4 relative">
          <img
            src="assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            type="text"
            placeholder="Search post"
            className="explore-search pl-12"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              onClick={removeSearchValue}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img
                src="assets/icons/close.svg"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold ">Last Popular Posts</h3>

        <SelectBlock
          options={[
            {
              value: "asc",
              label: "Newest",
              path: "/assets/icons/sort-asc.svg",
            },
            {
              value: "desc",
              label: "Oldest",
              path: "/assets/icons/sort-desc.svg",
            },
          ]}
          value={sortOrder}
          onChangeOption={handleSortOrderChange}
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
          posts?.pages.map(
            (item, index) =>
              item && (
                <GridPostList
                  key={`page-${index}`}
                  posts={item.documents ?? []}
                  // sortOrder={sortOrder}
                />
              )
          )
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader wdth={wdth} hgt={hgt} />
        </div>
      )}
    </div>
  );
};

export default Explore;
