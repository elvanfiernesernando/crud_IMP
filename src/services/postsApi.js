import { api } from "@/utils";

const get_posts = async (filter, id)=>{
  try {
    const { data } = await api.get(`/posts${id ? `/${id}` : ''}`, {
      params: filter
    });
    return data;
  } catch (error) {
    return error;
  }
}

export { get_posts }