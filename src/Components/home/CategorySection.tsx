import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Watches", value: "WATCHES", image: "⌚" },
  { label: "Jewelry", value: "JEWELRY", image: "💍" },
  { label: "Art", value: "ART", image: "🎨" },
  { label: "Real Estate", value: "REAL_ESTATE", image: "🏠" },
  { label: "Electronics", value: "ELECTRONICS", image: "💻" },
];

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() =>
              navigate(
                `/auctions?category=${encodeURIComponent(cat.value)}`
              )
            }
            className="
              bg-white shadow-md rounded-xl p-6 text-center
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
              cursor-pointer border border-transparent
              hover:border-green-500
            "
          >
            <div className="text-4xl mb-3">{cat.image}</div>
            <p className="font-medium">{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}