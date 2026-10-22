import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export default function ActionCard({ icon: Icon, title, description, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border bg-white p-4 text-left transition
                 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                     bg-gray-100 text-gray-700 transition
                     group-hover:bg-blue-100 group-hover:text-blue-600"
        >
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}