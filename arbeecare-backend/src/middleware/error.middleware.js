export function errorHandler(err, req, res, next) {
    // log stack in dev
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    // for validation libraries, you might parse details here
    res.status(status).json({ error: message });
  }
  