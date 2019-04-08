import Boom from 'boom';

module.exports = [
  {
    method: 'GET',
    path: '/auth/twitter',
    config: {
      auth: 'twitter', // <-- use our twitter strategy and let bell take over
      handler: async (request, h) => {

        if (!request.auth.isAuthenticated) {
          return h(Boom.unauthorized(`Authentication failed: ${request.auth.error.message}`));
        }

        // Just store a part of the twitter profile information in the session as an example. You could do something
        // more useful here - like loading or setting up an account (social signup).
        const { profile } = request.auth.credentials;

        await request.cookieAuth.set({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName
        });

        return h.redirect('/');
      }
    }
  },
  {
    method: 'GET',
    path: '/session',
    config: {
      auth: 'session', // <-- require a session for this, so we have access to the twitter profile
      handler: (request, h) => {

        // Return a message using the information from the session
        return `Hello, ${request.auth.credentials.displayName}!`;
      }
    }
  }
];
