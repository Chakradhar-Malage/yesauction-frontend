import { CheckCircle2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { User } from "../../types/User";
import { ROUTES } from "../../utils/routes";

export default function ProfileHeader({ user }: { user: User }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar username={user.username} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {user.username}
            </h1>
            {user.roles?.map((role) => (
              <span
                key={role}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {role.replace("ROLE_", "")}
              </span>
            ))}
          </div>

          <p className="mt-1 text-sm text-gray-500">{user.email}</p>

          {user.mobileNumberVerified && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Mobile verified
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.editProfile)}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm
                     font-medium text-gray-700 transition hover:bg-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}