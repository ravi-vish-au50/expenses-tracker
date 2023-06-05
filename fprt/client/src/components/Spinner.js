import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 grid place-items-center w-full h-[calc(100vh-5rem)] bg-[rgba(0,0,0,0.2)]">
        <span className="text-2xl">Loading...</span>
      </div>
    </>
  );
};

export default Spinner;
