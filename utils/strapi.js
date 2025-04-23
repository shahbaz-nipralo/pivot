// utils/strapi.js

export async function storeUserInStrapi(user) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            email: user.email,
            name: user.name,
          },
        }),
      });
      const { user } = useUser();
      console.log("dsfdfdf",user);
      
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error saving user to Strapi:", err);
    }
  }
  