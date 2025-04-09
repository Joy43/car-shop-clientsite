import { useEffect, useState } from 'react';
import { TQueryParam } from '../../types';
import { useGetAllcarsQuery } from '../../redux/features/carProduct/carProduct.api';
import ProductSkeleton from './ProductSkeleton';
import { Link } from 'react-router-dom';

const categories = ['All', 'SUV', 'Sedan', 'Truck', 'Coupe', 'Convertible', 'BMW', 'Tesla Cybertruck'];
const itemsPerPage = 6;
const MAX_PRICE = 840000;

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [params, setParams] = useState<TQueryParam[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setSearch(queryParams.get('searchTerm') || '');
    setSelectedCategory(queryParams.get('category') || 'All');
    setPriceRange(Number(queryParams.get('price_lte')) || MAX_PRICE);
    setInStockOnly(queryParams.get('inStock') === 'true');
    setPage(Number(queryParams.get('page')) || 1);
  }, []);

  useEffect(() => {
    const queryParams: TQueryParam[] = [
      { name: 'limit', value: itemsPerPage.toString() },
      { name: 'page', value: page.toString() },
    ];

    if (debouncedSearch) queryParams.push({ name: 'searchTerm', value: debouncedSearch });
    if (selectedCategory !== 'All') queryParams.push({ name: 'category', value: selectedCategory });
    if (priceRange < MAX_PRICE) queryParams.push({ name: 'price_lte', value: priceRange.toString() });
    if (inStockOnly) queryParams.push({ name: 'inStock', value: 'true' });

    const url = new URL(window.location.href);
    queryParams.forEach(({ name, value }) => url.searchParams.set(name, value.toString()));
    window.history.replaceState(null, '', url.toString());

    setParams(queryParams);
  }, [page, debouncedSearch, selectedCategory, priceRange, inStockOnly]);

  const { data, isLoading, isError, error } = useGetAllcarsQuery(params);
  const products = data?.data || [];
  const totalPages = data?.meta?.totalPage || 0;

  const visiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 min-h-screen bg-gray-50">
      {/* Filter Sidebar */}
      <aside className="lg:w-72 w-full bg-white p-6 rounded-xl shadow-md h-fit sticky top-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Car Product</h2>
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Brand, model, or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ${priceRange.toLocaleString()}
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="2000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="absolute -bottom-6 right-0 text-sm text-gray-500">
                ${MAX_PRICE.toLocaleString()}
              </div>
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="inStock"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="inStock" className="text-sm text-gray-700">
              Show only in stock
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Results Header */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/*--------------- Product Items ------------------------*/}
        {isError ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-red-500">Error loading products: {(error as any)?.message}</p>
          </div>
        ) : isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(itemsPerPage)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-video">
                    <img
                      src={product.imageUrls[0]}
                      alt={`${product.brand} ${product.model}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-red-500 text-xs font-medium">
                      {product.year}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.brand} 
                      </h3>
                      <p className="text-lg font-bold text-red-500">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product?.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>

                      {/* -----------viw deails------- */}

                      <Link to={`/products/${product._id}`}>
                      <button className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                      </Link>
                     
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {visiblePages().map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-md ${
                      page === p
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
