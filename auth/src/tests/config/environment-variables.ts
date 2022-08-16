// Set postgres url database
// to be "<currentDatabase>_test"
const currentUrl =
  process.env.POSTGRES_URL || 'postgresql://postgres:1234@localhost:5432/auth';

if (!currentUrl.includes('test')) {
  process.env.POSTGRES_URL = currentUrl + '_test';
}

// Essential envs check
if (!process.env.JWT_SECRET_KEY) {
  console.error('JWT_SECRET_KEY environment variable is not provided');
  process.exit(1);
}

if (!process.env.COOKIE_KEY) {
  console.error('COOKIE_KEY environment variable is not provided');
  process.exit(1);
}
