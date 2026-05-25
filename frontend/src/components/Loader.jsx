import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-orange-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-2 border-4 border-orange-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 13l2-8 3 4 3-4 2 8H5zM3 13h14v2H3z" />
            </svg>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Royal Crest Estate
          </h2>
          <div className="w-48 h-1 bg-orange-100 rounded-full overflow-hidden mx-auto mt-4">
            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
