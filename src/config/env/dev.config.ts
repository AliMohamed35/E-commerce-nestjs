export default () => ({
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  tokenAccess: {},
  cloud: {
    api_key: process.env.CLOUD_API_KEY,
  },
  access: {
    jwt_secret: process.env.JWT_SECRET,
  },
});
