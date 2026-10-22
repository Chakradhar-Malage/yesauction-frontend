export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 py-10">
      <div className="mb-6 h-32 rounded-xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}