import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export const useSaveUserToStrapi = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const saveUser = async () => {
        try {
          const response = await fetch('/api/auth/save-to-strapi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.nickname || user.name || user.email.split('@')[0],
              email: user.email,
              picture: user.picture,
              auth0Id: user.sub
            })
          });

          if (response.status === 405) {
            throw new Error('API endpoint does not accept POST requests');
          }

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Failed to save user');
          }

          console.log('User saved successfully:', data);
        } catch (error) {
          console.error('Save user error:', error);
        }
      };

      saveUser();
    }
  }, [user]);
};