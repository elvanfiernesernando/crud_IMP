const createSlug = (str) => {
  return str
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .trim() // trim leading/trailing white space
    .replace(/[\s_-]+/g, '-') // replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
}

export { createSlug }