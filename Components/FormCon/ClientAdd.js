import React from 'react'
import { Button, Form, Input, Space, Tooltip } from "antd";
import { ApiEndPoint } from '@/public/ApiEndPoint';
import axios from 'axios';


const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };
  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    "Input a number"
  );
  return (
    <Tooltip
      trigger={["focus"]}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter Phone no."
        maxLength={10}
      />
    </Tooltip>
  );
};
const ClientAdd = ({ setIsModalOpen, GetclientData }) => {
  const [form] = Form.useForm();
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
  const onFinish = (values) => {
    console.log(values, "values");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data = {
      ...values,
      userId: UserId,
    };
    axios
      .post(ApiEndPoint + "client", data)
      .then((response) => {
        // Handle the response from the backend
        console.log("response".response);
        if (response.status == 200) {
          //    getAllChemicalData();
          setIsModalOpen(false);
          GetclientData()
        }
      })
      .catch((error) => {
        console.log("error", error);
        // Handle any errors or unauthorized access
      });
  };
  return (
    <div className="w-full px-4 py-4">
      <h2>Add New Client</h2>

      <Form
        form={form}
        className="mt-4"
        name="chemicalForm"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
      >
        <label className="text-[1.5rem] font-inter font-medium">
          Client Name
        </label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Missing name",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Client Name" />
        </Form.Item>
        <label className="text-[1.5rem] font-inter font-medium">
          Client Email
        </label>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Missing Email",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Email" />
        </Form.Item>
        <label className="text-[1.5rem] font-inter font-medium">
          Client Phone No.
        </label>
        <Form.Item
          name="phoneNo"
          rules={[
            {
              required: true,
              message: "Missing Phone No.",
            },
          ]}
        >
          <NumericInput size="large" placeholder="Enter Phone N" />
        </Form.Item>

        <label className="text-[1.5rem] font-inter font-medium">
          Client Address
        </label>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Missing address",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Address" />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded h-[40px] px-3 font-poppins text-[1.4rem] border border-mainDark"
            >
              Cancel
            </button>
            <button
              className="bg-mainDark text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
              type="sumbit"
            >
              Save
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClientAdd