import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              YesAuction
            </h2>
            <p>
              The modern platform for live auctions and real-time bidding.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/auctions"
                  className="hover:text-blue-400 transition-colors"
                >
                  Auctions
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="hover:text-blue-400 transition-colors"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-blue-400 transition-colors"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="hover:text-blue-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © 2026 YesAuction. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
