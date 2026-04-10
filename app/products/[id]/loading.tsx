export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Image skeleton */}
        <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded" />

        {/* Text skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}