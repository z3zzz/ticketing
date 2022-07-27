export const PORT = parseInt(process.env.PORT || '5000');
export const POSTGRES_URL =
  process.env.POSTGRES_URL ||
  'postgresql://postgres:1234@localhost:5432/postgres';
