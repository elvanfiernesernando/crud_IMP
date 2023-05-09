import { get_posts } from "@/services"
import { getQueryClient } from "@/utils"
import { dehydrate } from "@tanstack/query-core"

const usePrefetchPostsData = async (filter, id) => {

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(["posts"], () => get_posts(filter, id));
    const dehydratedState = dehydrate(queryClient);

    return { dehydratedState }
}

export { usePrefetchPostsData }