import React, { useState } from 'react'
import { Button, Form, Input, Select,Upload } from "antd";
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';
import { PlusOutlined,LoadingOutlined  } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const UserForm = ({ setIsModalOpen, userData, getUserData }) => {
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
  const[fileObj,setFileObj]=useState()
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState();
  const [imageSignUrl, setImageSignUrl] = useState();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    const data = {
      ...values,
      stampImg:imageUrl,
      signImg:imageSignUrl,
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
  
  const handleChange = (info) => {
    setFileObj(info)
        getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem("base64Img",url)
      });

  };
  const handleSignChange = (info) => {
    setFileObj(info)
        getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageSignUrl(url);
        localStorage.setItem("base64Img",url)
      });

  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
<div className='grid grid-cols-2 gap-3'>
<div className="">
<label className="text-[18px] font-medium">Stamp Image</label>
<Upload
name="avatar"
listType="picture-card"
className="avatar-uploader UploadImages"
showUploadList={false}
beforeUpload={beforeUpload}
onChange={handleChange}
>
{imageUrl ? (
  <img
    src={imageUrl}
    alt="avatar"
    style={{
      width: '100%',
    }}
  />
) : (
  uploadButton
)}
</Upload>
</div>
<div className="">
<label className="text-[18px] font-medium">Sign Image</label>
<Upload
name="avatar"

listType="picture-card"
className="avatar-uploader UploadImages"
showUploadList={false}
beforeUpload={beforeUpload}
onChange={handleSignChange}
>
{imageSignUrl ? (
  <img
    src={imageSignUrl}
    alt="avatar"
    style={{
      width: '100%',
    }}
  />
) : (
  uploadButton
)}
</Upload>
</div>
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