import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Ftech Issue With Tranction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransection]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete-transection", {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("please fill all fields");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="head flex justify-between items-center py-3 w-full bg-zinc-300 px-4">
        <div className="frequency">
          <p className="tracking-wider font-bold mb-1">Select Frequency</p>
          <Select
            className="flex gap-2"
            value={frequency}
            onChange={(values) => setFrequency(values)}
          >
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>

        <div className="type">
          <p className="tracking-wider font-bold mb-1">Select Type</p>
          <Select
            className="flex gap-2"
            value={type}
            onChange={(values) => setType(values)}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>

        <div className="flex gap-4">
          <button
            className="cursor-pointer px-3 py-2 bg-blue-400 rounded"
            onClick={() => setViewData("table")}
          >
            Dashboard
          </button>
          <button
            className="cursor-pointer px-4 py-2 bg-blue-400 rounded"
            onClick={() => setViewData("analytics")}
          >
            Stats
          </button>
        </div>
        <div>
          <button
            className="cursor-pointer px-3 py-2 bg-green-400 rounded"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      <div className="grid place-items-center">
        <Modal
          title={editable ? "Edit Transaction" : "Add Transection"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form
            className="py-0"
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" required />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item className="w-50" label="Type" name="type">
                <Select>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item className="w-50" label="Category" name="category">
                <Select>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="tax">TAX</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Refrence" name="refrence">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" required />
            </Form.Item>
            <button type="submit" className="block px-4 py-1 bg-green-300 roundd-sm">
              Save
            </button>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
