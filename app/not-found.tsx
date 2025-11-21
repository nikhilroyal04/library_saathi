import { Ghost, Sparkles } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-blue-900 to-cyan-900 text-white px-4 py-20">
      <div className="flex flex-col items-center">
        <span className="relative flex w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/60 via-blue-500/60 to-blue-300/60 blur-2xl opacity-60"></div>
          <div className="w-32 h-32 flex items-center justify-center z-10">
            <Ghost className="w-20 h-20 text-cyan-300" />
            <Sparkles className="w-8 h-8 text-blue-200 absolute top-2 right-4 animate-spin-slow" />
          </div>
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 text-center drop-shadow-lg">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center">
          Oops! The page you're searching for doesn't exist.
        </h2>
        <p className="text-md md:text-lg text-blue-100/90 mb-8 text-center max-w-xl">
          Maybe you took a wrong turn, or this page was moved. But don&apos;t worry, our shelves are still full of adventure—explore and discover something new!
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-2xl shadow-xl font-bold text-lg transition-transform hover:scale-105 hover:from-cyan-600 hover:to-blue-500"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;