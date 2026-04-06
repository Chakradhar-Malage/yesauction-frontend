import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Watches", image: "⌚" },
  { name: "Jewelry", image: "💍" },
  { name: "Gaming", image: "🎮" },
  { name: "Art", image: "🎨" },
  { name: "Real Estate", image: "🏠" }
];

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/auctions?category=${cat.name}`)} // ✅
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-3">{cat.image}</div>
            <p className="font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}