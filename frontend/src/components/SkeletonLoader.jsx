export function SkeletonLoader() {
  return (
    <div className="space-y-4 p-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
