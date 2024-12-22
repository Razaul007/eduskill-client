import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="text-lg mt-4">Oops! Page not found.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;