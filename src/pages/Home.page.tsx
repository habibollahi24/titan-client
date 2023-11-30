import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import callApi from "../services/callApi";
import { formatDistance } from "date-fns";
import { HiOutlineChat, HiHeart, HiOutlineHeart } from "react-icons/hi";
import Comment from "../features/post/components/Comment";
import PostList from "../features/post/components/PostList";

function HomePage() {
  return (
    <div className="">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-lg">
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
