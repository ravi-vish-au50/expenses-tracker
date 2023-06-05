import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <header className="w-full h-[5rem] tracking-wider border-b">
        <nav className="max-w-[1200px] h-full mx-auto flex justify-between items-center">
          <Link className="text-2xl font-bold" to="/">
            Expense App
          </Link>

          <div className="flex gap-[2rem] items-center">
            <p className="text-lg">welcome, {loginUser && loginUser.name}</p>
            <button
              className="px-4 py-2 rounded bg-rose-400 tracking-wider"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
