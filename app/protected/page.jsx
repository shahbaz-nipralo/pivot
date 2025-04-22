'use client';


export default function page() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {!user ? (
        <a href="/api/auth/login">Login</a>
      ) : (
        <>
          <img src={user.picture} alt={user.name} />
          <h2>Welcome, {user.name}</h2>
          <a href="/api/auth/logout">Logout</a>
        </>
      )}
    </div>
  );
}
