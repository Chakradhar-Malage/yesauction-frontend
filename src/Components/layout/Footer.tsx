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
              <li>Auctions</li>
              <li>Categories</li>
              <li>How it Works</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>

            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Terms</li>
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