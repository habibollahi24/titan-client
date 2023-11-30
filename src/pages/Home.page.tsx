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
