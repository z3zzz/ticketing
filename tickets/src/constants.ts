export const PORT = parseInt(process.env.PORT || '5001');
export const POSTGRES_URL =
  process.env.POSTGRES_URL ||
  'postgresql://postgres:1234@localhost:5432/tickets';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const COOKIE_KEY = process.env.COOKIE_KEY;
export const DOMAIN = process.env.DOMAIN || 'localhost';
export const NODE_ENV = process.env.NODE_ENV;
