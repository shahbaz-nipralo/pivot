// In your Auth0 configuration (usually in lib/auth0.js)
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: '/profile',
      authorizationParams: {
        scope: 'openid profile email' // Request these scopes
      }
    });
  }
});