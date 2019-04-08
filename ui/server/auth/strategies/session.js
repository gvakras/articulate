export default {
  name: 'session',
  scheme: 'cookie',
  options: {

    cookie: {
      name: 'articulate',

      // Don't forget to change it to your own secret password!
      password: 'password-should-be-32-characters',

      // For working via HTTP in localhost
      isSecure: false,
    },

    redirectTo: '/auth/twitter',
  },
};
