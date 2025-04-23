// pages/dashboard.js
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSaveUserToStrapi } from '../hooks/useSaveUserToStrapi';

export default function Dashboard() {
  const { user } = useUser();
  useSaveUserToStrapi();

  if (!user) {
    return <div>Please login to access this page</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Dashboard content */}
    </div>
  );
}