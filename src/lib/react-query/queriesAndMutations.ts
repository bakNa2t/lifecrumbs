import {
  //   useQuery,
  useMutation,
  useQueryClient,
  //   useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentPosts"],
      });
    },
  });
};
