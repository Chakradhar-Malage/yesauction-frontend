import { ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VerificationRow from "./VerificationRow";
import { User } from "../../types/User";
import { ROUTES } from "../../utils/routes";

export default function TrustSafety({ user }: { user: User }) {
  const navigate = useNavigate();
  const mobileVerified = user.mobileNumberVerified ?? false;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Trust & Safety</h2>
          <p className="mt-1 text-sm text-gray-500">
            Verification helps keep our auction marketplace safe.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4">
        <VerificationRow
          label="Email Address"
          verified
          description="Your account email is registered."
        />
        <VerificationRow
          label="Mobile Number"
          verified={mobileVerified}
          description={
            mobileVerified
              ? "Your mobile number is verified."
              : "Verify your mobile number to increase account security."
          }
        />
        <VerificationRow
          label="Identity Verification"
          verified={false}
          description="Identity verification has not been completed."
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => navigate(ROUTES.verification)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600
                     transition hover:text-blue-700 hover:underline focus:outline-none"
        >
          Manage Verification
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}