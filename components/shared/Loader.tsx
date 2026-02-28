import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-teal-50 to-white py-16">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin border-t-teal-600"></div>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-900 mb-2">Loading</p>
        <p className="text-gray-600">
          Please wait while we fetch your content...
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-75"></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );
};

export default Loader;
