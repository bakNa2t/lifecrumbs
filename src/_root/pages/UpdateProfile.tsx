import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Loader from "@/components/shared/Loader";

import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { ProfileValidatinSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/lib/react-query/queriesAndMutations";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof ProfileValidatinSchema>>({
    resolver: zodResolver(ProfileValidatinSchema),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserByIdQuery(id || "");
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
    useUpdateUserMutation();

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            className="invert-white"
            width={32}
            height={32}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit profile</h2>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
