'use client';

import { FaPhoneAlt } from 'react-icons/fa';
import { BsChatQuoteFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const feedbacks = [
  {
    text: "I really had my doubts at first. I asked for a quote online and the next day I was contacted by a sales representative. The quote came out high so the salesman did a good job to find me a good deal.",
    name: "David Morgan",
    title: "Director Of Morden Trade Ltd",
    img: "https://unicoderbd.com/template/chaka/assets/images/testimonial/1.png",
  },
  {
    text: "The service was quick and efficient. The staff was extremely helpful and guided me through every step of the process.",
    name: "Sarah Johnson",
    title: "CEO of TechPro Solutions",
    img: "https://static.vecteezy.com/system/resources/thumbnails/044/453/324/small_2x/beautiful-young-latin-american-woman-portrait-woman-walking-in-evening-city-in-hat-with-curly-hair-in-warm-weather-smiling-and-looking-at-camera-close-up-photo.jpg",
  },
  {
    text: "Great experience! Transparent pricing and excellent customer support throughout.",
    name: "Michael Smith",
    title: "Manager at AutoHouse Inc.",
    img: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
];

const CustomerFeedback = () => {
  return (
    <section className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
      {/* -----Image Section----------- */}
      <div className="relative">
        <img
          src="https://unicoderbd.com/template/chaka/assets/images/background/8.png"
          alt="Car Image"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/*----------- Feedback Section -------------------*/}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
        <BsChatQuoteFill className="text-red-500 text-4xl mb-4" />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="mb-8"
        >
          {feedbacks.map((fb, index) => (
            <SwiperSlide key={index}>
              <p className="text-gray-600 mb-6">{fb.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src={fb.img}
                  alt={fb.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-gray-300"
                />
                <div>
                  <h4 className="text-lg font-semibold text-red-600">{fb.name}</h4>
                  <p className="text-gray-500 text-sm">{fb.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Contact Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold">Reliability & Quality Service.</h4>
            <p className="text-lg mt-2">
              If you would like to take our service and support, please contact us through our
              provided number.
            </p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <FaPhoneAlt className="text-2xl" />
            <div>
              <h4 className="text-2xl font-semibold">+1 817-946-1548</h4>
              <p className="text-lg">9:00 AM - 8:00 PM</p>
              <p className="text-lg">Sunday Off</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
