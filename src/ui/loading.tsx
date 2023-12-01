export const MainLoading = () => {
  return (
    <div className="mx-auto mb-2 h-[400px]   w-11/12 rounded-md  bg-gray-100/30 dark:bg-gray-900/30">
      <div className=" flex h-full  animate-pulse flex-col items-center  justify-center">
        <div className="mb-4 h-40  w-40 rounded-full bg-gray-300"></div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-5 w-32 rounded-md bg-gray-300 "></div>
          <div className="h-5 w-32 rounded-md bg-gray-300 "></div>
          <div className="h-5 w-32 rounded-md bg-gray-300 "></div>
          <div className="flex items-center justify-center space-x-3">
            <div className="h-10 w-28 rounded-md bg-gray-300 "></div>
            <div className="h-10 w-28 rounded-md bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};
type Props = {
  number?: number;
};

export function LoaderPostList({ number = 5 }: Props) {
  return (
    <div>
      {[...new Array(number)].fill(1).map((_, index) => {
        return (
          <div
            key={index}
            className="mx-auto mb-6  w-full rounded-md bg-gray-100/30 dark:bg-gray-900/30 "
          >
            <div className="flex h-full w-full animate-pulse flex-col space-y-4 p-8">
              <div className="flex items-center justify-between ">
                <div className="h-10 w-10  rounded-full bg-gray-300 "></div>
                <div className="h-10 w-28 rounded-md bg-gray-300 "></div>
              </div>
              <div className="h-80 w-full  rounded-2xl bg-gray-300 "></div>
              <div className="flex flex-col space-y-3">
                <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
                <div className="h-6 w-32 rounded-md bg-gray-300 "></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export function LoaderCommentList({ number = 2 }: Props) {
  return (
    <div>
      {[...new Array(number)].fill(1).map((_, index) => {
        return (
          <div
            key={index}
            className="mx-auto mt-6  w-full rounded-md bg-gray-100/30 dark:bg-gray-900/30 "
          >
            <div className="flex h-full w-full animate-pulse flex-col space-y-2 ">
              <div className="flex items-center justify-between ">
                <div className="h-10 w-10  rounded-full bg-gray-300 "></div>
                <div className="h-6 w-10  rounded-md bg-gray-300 "></div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
