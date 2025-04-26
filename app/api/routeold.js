// pages/api/auth/save-to-strapi.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
      const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
      // First check if user already exists
      const checkResponse = await fetch(
        `${STRAPI_URL}/auth-users?filters[email][$eq]=${req.body.email}`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`
          }
        }
      );
  
      const existingUsers = await checkResponse.json();
  
      if (existingUsers.data && existingUsers.data.length > 0) {
        return res.status(200).json({ 
          message: 'User already exists in Strapi',
          user: existingUsers.data[0]
        });
      }
  
      // If user doesn't exist, create new record
      const createResponse = await fetch(`${STRAPI_URL}/auth-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: req.body  // Strapi v4 uses "data" wrapper
        })
      });
  
      if (!createResponse.ok) {
        throw new Error(`Strapi responded with ${createResponse.status}`);
      }
  
      const createdUser = await createResponse.json();
      return res.status(200).json(createdUser);
  
    } catch (error) {
      console.error('Strapi integration error:', error);
      return res.status(500).json({ 
        message: 'Internal Server Error',
        error: error.message 
      });
    }
  }