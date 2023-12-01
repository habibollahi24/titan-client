import { formatDistance } from "date-fns";
import { useState } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineChat,
  HiPencil,
} from "react-icons/hi";
import { useMutation, useQuery } from "@tanstack/react-query";
import callApi from "../../../services/callApi";
import Comment from "./Comment";
import {  LoaderPostList } from "../../../ui/loading";

export const getAllPosts = async () => {
  const response = await callApi().get(`/posts`);
  return response;
};

export const likePost = async (id: string) => {
  const response = await callApi().post(`/posts/like/${id}`);
  return response;
};

export const getUser = async () => {
  const response = await callApi().post(`/users/user`);
  return response;
};

function PostList() {
  const [postId, setPostId] = useState("");

  const { data: userOwnerData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  //   console.log(userOwnerData?.data?.user._id);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      refetch();
    },
  });

  const likePostHandler = (id: string) => {
    mutateAsync(id);
  };

  if (isLoading) return <LoaderPostList />;
  const posts = data?.data?.data;
  //   console.log(posts);

  return (
    <div className="mb-0 space-y-4 rounded-lg bg-gray-100 p-2 shadow-sm dark:bg-secondary-900 sm:p-6 md:p-4 lg:p-8">
      {posts
        .sort(
          (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt),
        )
        .map((post: any) => {
          return (
            <div
              key={post._id}
              className=" border-b-2 pb-16 dark:border-secondary-500 "
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 overflow-hidden rounded-2xl">
                    {post.userId.profileUrl === "" ? (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary-200 font-bold capitalize text-secondary-600">
                        {post.userId.firstName[0]}
                      </div>
                    ) : (
                      <img
                        src={post.userId.profileUrl}
                        alt={post.userId.firstName}
                      />
                    )}
                  </div>
                  <div className="text-xs font-bold capitalize leading-3 text-secondary-500">
                    <p className="text-sm">{post.userId.firstName}</p>
                    <p>{post.userId.lastName}</p>
                  </div>
                </div>
                <div>
                  <span className=" pt-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="mt-8 w-full overflow-hidden rounded-lg bg-black">
                <img
                  src={post.image}
                  alt=""
                  className=" mx-auto object-contain"
                />
              </div>
              <div className="mt-8 text-secondary-600 dark:text-secondary-400">
                <HiPencil className="inline" />
                {post.description}
              </div>
              <div className=" my-4 flex items-center space-x-2 text-secondary-600">
                <button
                  onClick={() => likePostHandler(post._id)}
                  className="flex cursor-pointer items-center rounded-md bg-secondary-200 px-2 py-[1px] "
                >
                  <span className="text-xs font-bold">
                    {post.likes.length}{" "}
                  </span>
                  <span className="text-xl">
                    {post.likes.includes(userOwnerData?.data?.user._id) ? (
                      <HiHeart className="text-red-500" />
                    ) : (
                      <HiOutlineHeart />
                    )}
                  </span>
                </button>
                <button
                  onClick={() => {
                    if (postId === post._id) {
                      return setPostId("");
                    }
                    setPostId(post._id);
                  }}
                  className="flex cursor-pointer items-center rounded-md bg-secondary-200 px-2 py-[1px]"
                >
                  <span className="text-xs font-bold">
                    {post.comments.length}
                  </span>
                  <span className="text-xl">
                    <HiOutlineChat />
                  </span>
                </button>
              </div>
              {postId === post._id && <Comment postId={post._id} />}
            </div>
          );
        })}
    </div>
  );
}

export default PostList;
