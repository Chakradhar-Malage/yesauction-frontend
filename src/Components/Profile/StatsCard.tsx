import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string | undefined;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function StatCard({ label, value, icon: Icon, onClick }: Props) {
  const content = (
    <div className="flex items-center gap-4 text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value ?? "—"}</p>
      </div>
    </div>
  );

  if (!onClick) {
    return <div className="rounded-xl border bg-white p-5 shadow-sm">{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border bg-white p-5 shadow-sm transition
                 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {content}
    </button>
  );
}