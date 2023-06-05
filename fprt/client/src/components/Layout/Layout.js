import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="relative max-w-[1200px] h-full mx-auto py-[4rem]">{children}</div>
    </>
  );
};

export default Layout;
