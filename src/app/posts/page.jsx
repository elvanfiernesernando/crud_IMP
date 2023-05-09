import { usePrefetchPostsData } from "@/hooks/usePrefetchPostsData";
import { Hydrate } from "@/utils";
import Post from "./post";

const Posts = async () => {

  const { dehydratedState } = usePrefetchPostsData()

  return (
    <Hydrate state={dehydratedState}>
      <Post />
    </Hydrate>
  );
}

export default Posts