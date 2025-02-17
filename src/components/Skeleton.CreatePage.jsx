export const SkeletonLoader = ({ width = "150px", height = "150px" }) => {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-2xl"
      style={{ width, height }}
    >
      <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
    </div>
  );
};

export default SkeletonLoader;
