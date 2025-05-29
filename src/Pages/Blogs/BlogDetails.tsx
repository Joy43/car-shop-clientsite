import { useParams } from "react-router-dom";
import { useGetblogsByIdQuery } from "../../redux/features/blog/blog.api";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetblogsByIdQuery(id as string);

  const blog = response?.data;

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !blog)
    return <div className="text-center py-10 text-red-500">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-6">{blog.content}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {blog.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-500">
            Published on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
