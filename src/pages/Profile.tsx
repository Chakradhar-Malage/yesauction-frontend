import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Profile() {

  const { user } = useCurrentUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

      </div>

    </div>
  );
}