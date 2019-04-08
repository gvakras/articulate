export default {
  name: 'twitter',
  scheme: 'bell',
  options: {
    provider: 'twitter',
    password: 'secret_cookie_encryption_password', // Use something more secure in production
    clientId: process.env.AUTH_TWITTER_KEY,
    clientSecret: process.env.AUTH_TWITTER_SECRET,
    isSecure: false, // Should be set to true (which is the default) in production,
    config: {
      getMethod: 'account/verify_credentials',
      getParams: {
        include_email: 'true',
        skip_status: 'true',
        include_entities: 'false'
      }
    }
  }
};
