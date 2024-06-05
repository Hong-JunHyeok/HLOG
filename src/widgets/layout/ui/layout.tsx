import { Outlet } from "react-router-dom";

import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />

      <div className="w-full min-h-screen bg-white">
        <div className="md:w-[600px] lg:w-[800px] xl:w-[1200px] mx-auto pt-[100px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
