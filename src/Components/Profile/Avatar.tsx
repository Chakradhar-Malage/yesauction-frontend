export default function Avatar({ username }: { username?: string }) {
  const initial = username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full
        bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl
        font-semibold text-white shadow-sm"
        aria-label={`Avatar for ${username ?? "user"}`}
    >
      {initial}
    </div>
  );
}
