// pages/api/auth/callback.js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

export default async function callback(req, res) {
  try {
    await handleCallback(req, res);

    const session = await getSession(req, res);
    if (session?.user) {
      const { email, nickname: username, sub: auth0Id } = session.user;

      // Perform sync operation here
      const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            username,
            email,
            auth0Id,
          }
        })
      });

      if (strapiResponse.ok) {
        console.log('User data synced with Strapi.');
      } else {
        console.error('Error syncing user:', await strapiResponse.json());
      }
    }

    return res.redirect('/');
  } catch (error) {
    console.error('Error in callback handler:', error);
    return res.status(500).json({ message: 'Error during callback' });
  }
}
