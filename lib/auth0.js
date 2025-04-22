// lib/auth0.js
import { initAuth0 } from '@auth0/nextjs-auth0';

export const auth0 = initAuth0({
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  baseURL: process.env.NEXT_AUTH_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
});
