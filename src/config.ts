const theme = {
  authLogoUrl: '/imgs/auth_logo.png',
  dashboardLogoUrl: '/imgs/dashboard_logo.png',
  colors: {
    brand: '#009FDE',
  },
};

const dev = {
  feUrl: 'http://localhost:3000',
  baseUrl: '', // https://mock.com/api/v1
};

const staging = {
  feUrl: 'https://wema-xpress.vercel.app',
  baseUrl: '', // https://mock.com/api/v1
};

const environments = { dev, staging };

type NextEnv = 'dev' | 'staging';
const nextEnv = (process.env.NEXT_PUBLIC_ENV || 'dev') as NextEnv;

const queryArgs = {
  searchParams: '',
  pageNumber: 1,
  pageSize: 10,
};

const config = {
  ...theme,
  tokenKey: 'token-key',
  ...dev,
  ...environments[nextEnv],
  queryArgs,
};

export default config;
