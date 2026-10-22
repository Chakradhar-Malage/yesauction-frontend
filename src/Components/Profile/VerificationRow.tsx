import { CheckCircle2, CircleAlert } from "lucide-react";

interface Props {
  label: string;
  verified: boolean;
  description: string;
}

export default function VerificationRow({ label, verified, description }: Props) {
  const Icon = verified ? CheckCircle2 : CircleAlert;
  const badgeClass = verified ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

  return (
    <div className="flex items-center justify-between gap-4 border-b py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      <span
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {verified ? "Verified" : "Not Verified"}
      </span>
    </div>
  );
}