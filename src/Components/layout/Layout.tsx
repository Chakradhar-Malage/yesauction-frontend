import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>

      {/* Navbar */}
      {/* <header>
        <h2>YesAuction</h2>
      </header> */}

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <p>© 2026 YesAuction</p>
      </footer>

    </div>
  );
};

export default Layout;