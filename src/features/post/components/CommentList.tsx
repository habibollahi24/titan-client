import { useMutation, useQuery } from "@tanstack/react-query";
import callApi from "../../../services/callApi";
import { formatDistance } from "date-fns";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { getUser } from "./PostList";
import { LoaderCommentList } from "../../../ui/loading";

export const getComments = async (postId: string) => {
  const response = await callApi().get(`/posts/comments/${postId}`);
  return response;
};
export const likeComment = async (id: string) => {
  const response = await callApi().post(`/posts/like-comment/${id}`);
  return response;
};

type Props = {
  postId: string;
};

function CommentList({ postId }: Props) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  const comments = data?.data?.data;
  //   console.log(comments);

  const { data: userOwnerData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      refetch();
    },
  });

  const likeCommentHandler = async (commentId: string) => {
    await mutateAsync(commentId);
  };

  if (isLoading) return <LoaderCommentList />;
  return (
    <div>
      {comments.map((comment: any) => {
        return (
          <div
            key={comment._id}
            className="dark:bg-secondary- my-4  space-y-1 border-l-2 p-3 dark:border-secondary-400 "
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 overflow-hidden rounded-2xl">
                    {comment.userId.profileUrl === "" ? (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary-200 font-bold capitalize text-secondary-600">
                        {comment.userId.firstName[0]}
                      </div>
                    ) : (
                      <img
                        src={comment.userId.profileUrl}
                        alt={comment.userId.firstName}
                      />
                    )}
                  </div>
                  <div className="text-xs font-bold  leading-3 text-secondary-500">
                    <p className="text-xs capitalize">
                      {comment.userId.firstName}
                    </p>
                    <p className=" text-[10px] font-bold text-gray-500 dark:text-gray-400">
                      {formatDistance(new Date(comment.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => likeCommentHandler(comment._id)}
                  className="flex cursor-pointer items-center rounded-md bg-secondary-200 px-2 py-[1px] "
                >
                  <span className="text-xs font-bold">
                    {comment.likes.length}
                  </span>
                  <span className="text-xl">
                    {comment.likes.includes(userOwnerData?.data?.user._id) ? (
                      <HiHeart className="text-red-500" />
                    ) : (
                      <HiOutlineHeart />
                    )}
                  </span>
                </button>
              </div>
            </div>
            <div className="text-secondary-700 dark:text-secondary-400">
              {comment.comment}
            </div>
            <div className="flex justify-end"></div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
