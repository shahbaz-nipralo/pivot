import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req, res) {
  const session = getSession(req, res);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { user } = session;
  const userData = {
    username: user.name,
    email: user.email,
    picture: user.picture,
  };

  try {
    // Send the user data to Strapi
    const strapiRes = await fetch('http://loakusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_STRAPI_API_KEY`,
      },
      body: JSON.stringify(userData),
    });

    if (strapiRes.ok) {
      const data = await strapiRes.json();
      return res.status(200).json(data);
    } else {
      return res.status(strapiRes.status).json({ message: 'Error updating user in Strapi' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error creating/updating user in Strapi' });
  }
}
