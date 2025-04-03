'use client';

import { FaPhoneAlt } from 'react-icons/fa';
import { BsChatQuoteFill } from 'react-icons/bs';

const CustomerFeedback = () => {
  return (
    <section className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
      {/* Image Section */}
      <div className="relative">
        <img
          src="https://unicoderbd.com/template/chaka/assets/images/background/8.png" 
          alt="Car Image"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      
      </div>

      {/* Feedback Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
        <BsChatQuoteFill className="text-red-500 text-4xl mb-4" />
        <p className="text-gray-600 mb-6">
          I really had my doubts at first. I asked for a quote online and the next day I was
          contacted by a sales representative. The quote came out high so the salesman did a good
          job to find me a good deal.
        </p>
        <div className="flex items-center gap-4">
          <img
            src="https://unicoderbd.com/template/chaka/assets/images/testimonial/1.png" 
            alt="Customer"
            width={50}
            height={50}
            className="rounded-full border-2 border-gray-300"
          />
          <div>
            <h4 className="text-lg font-semibold text-red-600">David Morgan</h4>
            <p className="text-gray-500 text-sm">Director Of Morden Trade Ltd</p>
          </div>
        </div>

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
