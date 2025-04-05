export default function ProductSkeleton() {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="aspect-video bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }