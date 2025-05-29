import blog from "../../../assets/carblogs/carblog (8).png"
import blog1 from "../../../assets/carblogs/carblog (1).png"
import blog2 from "../../../assets/carblogs/carblog (4).png"
import blog3 from "../../../assets/carblogs/carblog (3).png"
import blog4 from "../../../assets/carblogs/carblog (5).png"
import blog5 from "../../../assets/carblogs/carblog.png"
import { Link } from "react-router-dom"

const Blogs = () => {
  return (
    <section className="w-full mx-auto max-w-[1400px] px-6 my-24">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[20px] md:text-[40px] font-[600]">
          Our Latest Blog Posts
        </h2>
       <Link to="carblog">
       
        <button className="md:py-[1rem] bg-red-500 py-[0.5rem] px-6 md:px-10 rounded-full md:text-[16px] text-[10px] bg-brandColor text-white flex items-center gap-2">
          See All Blog Posts
        </button></Link>
      </div>

      {/* cards */}
      <div className="flex justify-between w-full mt-12 gap-6 flex-col md:flex-row">
        <div className="flex gap-6 md:flex-row flex-col">
          <div className="md:w-[380px] w-full">
            <img
              src={blog2}
              alt="blog_image"
              className="w-full object-cover rounded-md"
            />
            <div className="flex items-center gap-3 text-[#64607D] my-3">
              <p>08-11-2021</p>
              <span>Category</span>
            </div>
            <h2 className="text-[20px] font-[600] mb-2">
              Believing neglected so so allowance existence departure.
            </h2>
            <p className="text-[16px] font-[500] text-[#64607D]">
              Blessing welcomed ladyship she met humoured sir breeding her. Six
              curiosity day assurance bed necessary.
            </p>
          </div>
          <div className="md:w-[380px] w-full">
            <img
              src={blog}
              alt="blog_image"
              className="w-full object-cover rounded-md"
            />
            <div className="flex items-center gap-3 text-[#64607D] my-3">
              <p>08-11-2021</p>
              <span>Category</span>
            </div>
            <h2 className="text-[20px] font-[600] mb-2">
              Believing neglected so so allowance existence departure.
            </h2>
            <p className="text-[16px] font-[500] text-[#64607D]">
              Blessing welcomed ladyship she met humoured sir breeding her. Six
              curiosity day assurance bed necessary.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-2 border-b border-[#DEE1E6] pb-6">
            <img
              src={blog1}
              alt="blog_image"
              className="w-[110px] h-[80px] object-cover"
            />
            <div>
              <div className="flex items-center gap-3 text-[#64607D]">
                <p>08-11-2021</p>
                <span>Category</span>
              </div>

              <h2 className="text-[18px] font-[600]">
                Partiality on or continuing in particular principles
              </h2>
            </div>
          </div>
          <div className="flex gap-2 border-b border-[#DEE1E6] pb-6">
            <img
              src={blog3}
              alt="blog_image"
              className="w-[110px] h-[80px] object-cover"
            />
            <div>
              <div className="flex items-center gap-3 text-[#64607D]">
                <p>08-11-2021</p>
                <span>Category</span>
              </div>

              <h2 className="text-[18px] font-[600]">
                Do believing oh disposing to supported allowance we.
              </h2>
            </div>
          </div>
          <div className="flex gap-2 border-b border-[#DEE1E6] pb-6">
            <img
              src={blog4}
              alt="blog_image"
              className="w-[110px] h-[80px] object-cover"
            />
            <div>
              <div className="flex items-center gap-3 text-[#64607D]">
                <p>08-11-2021</p>
                <span>Category</span>
              </div>

              <h2 className="text-[18px] font-[600]">
                Village did removed enjoyed explain nor ham saw.
              </h2>
            </div>
          </div>
          <div className="flex gap-2 border-b border-[#DEE1E6] pb-6">
            <img
              src={blog5}
              alt="blog_image"
              className="w-[110px] h-[80px] object-cover"
            />
            <div>
              <div className="flex items-center gap-3 text-[#64607D]">
                <p>08-11-2021</p>
                <span>Category</span>
              </div>

              <h2 className="text-[18px] font-[600]">
                Securing as informed declared or margaret
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;