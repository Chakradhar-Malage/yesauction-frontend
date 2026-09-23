import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Bidding
  {
    category: "Bidding",
    question: "How do I place a bid?",
    answer:
      "Go to any active auction page, enter your bid amount (must be higher than the current price), and click 'Place Bid'. Your bid will be processed instantly.",
  },
  {
    category: "Bidding",
    question: "What happens if I get outbid?",
    answer:
      "You will receive a notification in the app. You can place a higher bid anytime before the auction ends.",
  },
  {
    category: "Bidding",
    question: "Can I cancel my bid?",
    answer:
      "No. Once a bid is placed, it cannot be cancelled. Please bid carefully.",
  },
  {
    category: "Bidding",
    question: "How does the bidding increment work?",
    answer:
      "Each new bid must be at least ₹1 higher than the current price. The system will reject lower bids.",
  },

  // Selling
  {
    category: "Selling",
    question: "How do I create an auction?",
    answer:
      "Go to your Seller Dashboard → Create Auction. Fill in the title, description, starting price, end time, and upload an image.",
  },
  {
    category: "Selling",
    question: "Can I edit my auction after creating it?",
    answer:
      "Yes, but only if no bids have been placed yet. Once someone bids, the auction details are locked.",
  },
  {
    category: "Selling",
    question: "How do I end an auction early?",
    answer:
      "From your Seller Dashboard, open the auction and click 'End Auction'. The highest bidder will be declared the winner.",
  },

  // Account
  {
    category: "Account",
    question: "How do I change my password?",
    answer:
      "Go to Profile → Edit Profile → Change Password. You will need to enter your current password.",
  },
  {
    category: "Account",
    question: "How do I delete my account?",
    answer:
      "Go to Profile → Delete Account. This will soft-delete your account. Your bid and auction history will remain for platform integrity.",
  },
  {
    category: "Account",
    question: "I forgot my password. What should I do?",
    answer:
      "Currently, please contact support through the Contact Us page. Password reset via email will be added soon.",
  },

  // Watchlist
  {
    category: "Watchlist",
    question: "How does the Watchlist work?",
    answer:
      "Click the heart icon on any auction to add it to your Watchlist. You can view all watched auctions from the Watchlist page.",
  },

  // General
  {
    category: "General",
    question: "Is YesAuction free to use?",
    answer:
      "Yes. Creating an account, bidding, and creating auctions is currently free.",
  },
  {
    category: "General",
    question: "How can I contact support?",
    answer:
      "You can reach us through the Contact Us page. Our team usually responds within 24–48 hours.",
  },
];

const categories = ["All", "Bidding", "Selling", "Account", "Watchlist", "General"];

export default function Help() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Help Center</h1>
          <p className="text-gray-500 text-lg">
            Find answers to common questions about YesAuction
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No results found. Try a different search.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="mt-14 text-center bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-gray-500 mb-5">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link
            to="/contact-us"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}