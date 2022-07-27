export const initialQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password VARCHAR(100)
  );
`;
