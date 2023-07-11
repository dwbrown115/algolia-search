export default booksSchema = {
  name: "books",
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string" },
    { name: "author", type: "string" },
    { name: "genre", type: "string" },
    { name: "rating", type: "float" },
  ],
  default_sorting_field: "rating",
};
