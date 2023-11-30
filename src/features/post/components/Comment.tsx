import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import callApi from "../../../services/callApi";
import { getUser } from "../../user/components/MainCart";
import CommentList, { getComments } from "./CommentList";

type Props = {
  postId: string;
};

export const addComment = async ({
  data,
  postId,
}: {
  data: any;
  postId: string;
}) => {
  const response = await callApi().post(`/posts/comment/${postId}`, data);
  return response;
};

function Comment({ postId }: Props) {
  const [comment, setComment] = useState("");

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  const user = data?.data.user;

  const { refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  const { mutateAsync } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      console.log(data);
      refetch();
      setComment("");
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.msg);
      }
    },
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    mutateAsync({
      data: { comment, from: user._id },
      postId,
    });
  };

  return (
    <div className="duration-300 animate-in zoom-in">
      <form onSubmit={submitHandler} className="flex items-start space-x-1">
        <div className="w-5/6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-textarea  w-full  rounded-md border-none bg-secondary-200  p-2 placeholder:text-xs focus:border-none  focus:outline-none focus:outline-primary-600 focus:ring-0"
            rows={1}
            placeholder="comment..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={comment.trim() === ""}
          className="btn btn-primary block w-1/6 px-0  text-center disabled:cursor-not-allowed disabled:opacity-30"
        >
          send
        </button>
      </form>
      <CommentList postId={postId} />
    </div>
  );
}

export default Comment;
