// app/api/storeUser/route.js
import axios from 'axios';

export async function POST(req) {
  try {
    const user = await req.json();  // Get the user data from the request body

    // Make sure the user object has the correct fields
    const { email, username, auth0Id } = user;
    if (!email || !username || !auth0Id) {
      return new Response('Missing required user data', { status: 400 });
    }

    // Now, send the data to Strapi API
    const strapiResponse = await axios.post('http://localhost:1337/api/auth-users', {
      data: {
        email,
        username,
        auth0Id,
      },
    });

    return new Response(JSON.stringify({ message: 'User data stored successfully', strapiResponse: strapiResponse.data }), { status: 200 });
  } catch (error) {
    console.error('Error storing user data:', error);
    return new Response('Error storing user data', { status: 500 });
  }
}
