export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <p className="text-xl text-secondary mb-6">Oops! Page not found.</p>
      <p className="text-secondary mb-8">Sorry, the page you're looking for does not exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
      >
        Go back home
      </a>
    </div>
  );
};

export default NotFound;
