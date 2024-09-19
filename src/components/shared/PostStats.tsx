import { Models } from "appwrite";

type PostStatProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatProps) => {
  return (
    <div className="flex justify-between items-start z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="assets/icons/like-heart-empty.svg"
          alt="heart"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="amall-medium lg:base-medium">0</p>
      </div>

      <div className="flex gap-2">
        <img
          src="assets/icons/sidebar/savemark.svg"
          alt="savemark"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
