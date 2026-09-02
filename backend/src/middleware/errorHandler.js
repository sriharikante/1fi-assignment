// Catches any error passed via next(err) and returns a consistent JSON shape.
// Must be registered last, after all routes.
export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Something went wrong on our end. Please try again." : err.message;

  res.status(statusCode).json({ success: false, message });
}

// Handles any request that didn't match a route.
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}
