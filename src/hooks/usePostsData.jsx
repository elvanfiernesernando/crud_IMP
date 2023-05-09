import { get_posts } from "@/services";
import { useQuery } from "@tanstack/react-query";

const usePostsData = (filter, id) => {
    return useQuery(["posts", filter, id], () => get_posts(filter, id))
}

export { usePostsData }