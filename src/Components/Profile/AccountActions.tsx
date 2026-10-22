import { BadgeCheck, Bell, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";
import { ROUTES } from "../../utils/routes";

export default function AccountActions() {
  const navigate = useNavigate();

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Account & Security</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your verification and security settings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ActionCard
          icon={BadgeCheck}
          title="Verification"
          description="Manage account verification."
          onClick={() => navigate(ROUTES.verification)}
        />
        <ActionCard
          icon={LockKeyhole}
          title="Security"
          description="Password, 2FA and sessions."
          onClick={() => navigate(ROUTES.security)}
        />
        <ActionCard
          icon={Bell}
          title="Notifications"
          description="View your recent notifications."
          onClick={() => navigate("/notifications")}
        />
      </div>
    </section>
  );
}