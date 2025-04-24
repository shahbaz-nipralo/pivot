// pages/api/sync-user.js
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  console.log('Sync user endpoint hit');
  
  const session = await getSession(req, res);
  console.log('Session:', session);

  if (!session?.user) {
    console.log('No session user');
    return res.status(401).json({ message: 'Not authenticated' });
  }

  console.log('User data:', session.user);
  const { email, nickname: username, sub: auth0Id } = session.user;

  try {
    // Send user data to Strapi
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          username,
          email,
          auth0Id,
          // confirmed: true
        }
      })
    });

    if (!strapiResponse.ok) {
      throw new Error('Failed to create user in Strapi');
    }

    const data = await strapiResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).json({ message: error.message });
  }
}