
const CarPurchaseSection = () => {
  return (
    <section className="text-center py-16 bg-white">
      <h2 className="text-3xl font-bold text-blue-900">
        Why Purchase Your Perfect Car From Our Company
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Ridiculus sociosqu malesuada vehicula dictum fermentum orci
        dictumst dui, suscipit quam. Taciti tortor cursus nisl dapibus.
      </p>

      <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 px-4">
        {/* Pre Owned Vehicles */}
        <div className="bg-blue-900 text-white p-8 rounded-lg w-full md:w-1/2 relative flex flex-col">
          
          <h3 className="text-2xl font-bold">Pre Owned Vehicles</h3>
          <p className="mt-4 text-lg text-gray-100">
            Reliable used cars with thorough inspections, best pricing, and
            financing options 
          </p>
          <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 self-start">
            View More
          </button>
        </div>

        {/* Brand New Cars */}
        <div className="bg-blue-900 text-white p-8 rounded-lg w-full md:w-1/2 relative flex flex-col">
    
          <h3 className="text-2xl font-bold">Brand New Cars</h3>
          <p className="mt-4 text-gray-100">
            The latest models with premium features, zero mileage, and the best
            offers for financing and leasing.
          </p>
          <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 self-start">
            View More
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          "New & Used Cars",
          "0% APR Financing",
          "Maintenance Packages",
          "Free Test Drive",
          "Vehicle History Reports",
          "Buy, Sell, Trade",
        ].map((service, index) => (
          <div
            key={index}
            className="text-center bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition"
          >
            <h4 className="text-lg font-bold text-blue-900">{service}</h4>
            <p className="text-gray-600 mt-2 text-lg">
              Arcu elit porttitor ut hac sit. Vulputate facilisis platea dolor.
            </p>
            <button className="mt-4 text-red-500 font-semibold hover:underline">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarPurchaseSection;
