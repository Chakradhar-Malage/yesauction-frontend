import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { ROUTES } from "../../utils/routes";

export default function AccountDetails({ user }: { user: User }) {
  const navigate = useNavigate();

  const fields = [
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Role", value: user.roles?.map((r) => r.replace("ROLE_", "")).join(", ") },
    { label: "Mobile Verified", value: user.mobileNumberVerified ? "Yes" : "No" },
    {
      label: "Member Since",
      value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—",
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
        <button
          type="button"
          onClick={() => navigate(ROUTES.editProfile)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600
                     hover:text-blue-700 hover:underline focus:outline-none"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </button>
      </div>

      <div className="grid gap-5 text-sm sm:grid-cols-2">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-gray-500">{label}</p>
            <p className="mt-1 font-medium text-gray-900">{value || "—"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}