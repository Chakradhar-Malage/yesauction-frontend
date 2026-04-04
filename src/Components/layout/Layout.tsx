// import React from "react";
// import Footer from "./Footer";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div>
//       {/* Page Content */}
//       <main>
//         {children}
//       </main>

//       {/* Footer */}
//       <Footer />

//     </div>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;