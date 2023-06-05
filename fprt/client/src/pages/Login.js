import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="grid place-items-center h-screen bg-zinc-400">
        {loading && <Spinner />}
        <Form
          className="w-[360px] px-4 py-4 bg-white rounded"
          layout="vertical"
          onFinish={submitHandler}
        >
          <h2 className="mb-3 text-xl font-bold">Login</h2>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="flex items-center justify-between">
            <p>
              don't have an account? <Link to="/register">register !</Link>
            </p>
            <button className="py-1 px-2 rounded-sm bg-green-300">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
