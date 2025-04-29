import axios from 'axios';

export async function POST(req) {
  try {
    const user = await req.json();
    const { email, username, auth0Id } = user;
    
    if (!email || !username || !auth0Id) {
      return new Response('Missing required user data', { status: 400 });
    }

    // First, check if user already exists in Strapi
    const existingUserResponse = await axios.get(
      `http://localhost:1337/api/auth-users?filters[auth0Id][$eq]=${auth0Id}`
    );

    const existingUsers = existingUserResponse.data.data;

    // If user exists, return success without creating new record
    if (existingUsers.length > 0) {
      return new Response(JSON.stringify({ 
        message: 'User already exists', 
        user: existingUsers[0] 
      }), { status: 200 });
    }

    // If user doesn't exist, create new record
    const strapiResponse = await axios.post('http://localhost:1337/api/auth-users', {
      data: { email, username, auth0Id },
    });

    return new Response(JSON.stringify({ 
      message: 'User data stored successfully', 
      user: strapiResponse.data.data 
    }), { status: 200 });

  } catch (error) {
    console.error('Error storing user data:', error);
    return new Response('Error storing user data', { status: 500 });
  }
}