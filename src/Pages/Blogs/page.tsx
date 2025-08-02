import Loading from "../../Components/Loading";
import { useGetAllBlogsQuery } from "../../redux/features/blog/blog.api";
import { Link } from "react-router-dom";
import { Banner } from "../Home/Banner/Banner";

const Blogspage = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery([]);
  const blogs = data?.data || [];

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong.
      </div>
    );

  return (
    <div>
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {blogs.map((blog: any) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-60">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{blog.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-red-700 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to={`/carblog/${blog._id}`}
                  className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogspage;
