import React from 'react'
import { Button, Form, Input, Select } from "antd";
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';
const UserForm = ({ setIsModalOpen, userData, getUserData }) => {
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    const data = {
      ...values,
      id: UserId,
    };
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .put(`${ApiEndPoint}users/`, data)
      .then((response) => {
        // Handle the response from the backend
        console.log("response".response);
        if (response.status == 200) {
          //    getAllChemicalData();
          setIsModalOpen(false);
          getUserData()
          // GetclientData();
        }
      })
      .catch((error) => {
        console.log("error", error);
        // Handle any errors or unauthorized access
      });
  };
  form.setFieldsValue({
    ...userData,
  });
  return (
    <div>
      <h3 className="text-center">Edit Your Info</h3>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <div className="">
          <span className="text-[18px] font-medium">Your Name</span>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter UserName" size="large" />
          </Form.Item>
        </div>
        <div className="">
          <span className="text-[18px] font-medium">Your Email</span>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter email" size="large" />
          </Form.Item>
        </div>
        <div className="">
          <span className="text-[18px] font-medium">Your Phone No</span>
          <Form.Item
            name="phoneNo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Phone NO" size="large" />
          </Form.Item>
        </div>
        <div className="">
          <span className="text-[18px] font-medium">Your Company</span>
          <Form.Item
            name="companyName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Company Name" size="large" />
          </Form.Item>
        </div>

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
              Update
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm