import React, { useEffect } from 'react'
import { Form, Input, Upload, message } from 'antd'
import { PlusOutlined,LoadingOutlined  } from '@ant-design/icons';

const LatterPadForm = ({setTextChange,intialvalues,loading,handleChange,imageUrl,beforeUpload}) => {
    const [form] = Form.useForm();

    const { TextArea } = Input;
         let UserId = "";
         let token;
         if (typeof localStorage != undefined) {
           UserId = localStorage.getItem("UserId");
           token = localStorage.getItem("token");
         }
         const onFinish = (values) => {
            console.log(values,imageUrl)

          }
          const normFile = (e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          };
          useEffect(()=>{
            form.setFieldsValue({
                text1:intialvalues.FirstLinetext1,
                text2:intialvalues.FirstLinetext2,
                text3:intialvalues.FirstLinetext3,
                agencyName:intialvalues.Agencyname,
                officeNo:intialvalues.officeNo,
                mobileNo:intialvalues.mobileNo,
                email:intialvalues.email,
                heading:intialvalues.textP,
                address:intialvalues.address,
                description:intialvalues.textContent
              });
          },[])
         
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
    <Form
          className=""
          form={form}
          name="control-hooks"
          onFinish={onFinish}

        >
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 px-2">
        <div className="">
          <span className="text-[16px] font-inter font-medium">
           Text1
          </span>
          <Form.Item
            name="text1"
            rules={[
              {
                required: true,
              },
            ]}
          >
          <Input
          placeholder="Enter Text1"
          onChange={setTextChange}
          name="FirstLinetext1"
          size="large"
        />
          </Form.Item>
        </div>
        <div className="">
        <span className="text-[16px] font-inter font-medium">
        Text2
        </span>
        <Form.Item
          name="text2"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Input
        placeholder="Enter Text2"
        size="large"
        name="FirstLinetext2"
        onChange={setTextChange}
      />
        </Form.Item>
      </div>
      <div className="">
      <span className="text-[16px] font-inter font-medium">
      Text3
      </span>
      <Form.Item
        name="text3"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Input
      name="FirstLinetext3"
      onChange={setTextChange}
      placeholder="Enter Text3"
      size="large"
    />
      </Form.Item>
    </div>
    <div className="">
    <span className="text-[16px] font-inter font-medium">
   Agency Name
    </span>
    <Form.Item
      name="agencyName"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <Input
    name="Agencyname"
    onChange={setTextChange}
    placeholder="Enter Agency Name"
    size="large"
  />
    </Form.Item>
  </div>

  <div className="">
  <span className="text-[16px] font-inter font-medium">
Office No.
  </span>
  <Form.Item
    name="officeNo"
    rules={[
      {
        required: true,
      },
    ]}
  >
  <Input
  name="officeNo"
    onChange={setTextChange}
  placeholder="Enter Office No."
  size="large"
/>
  </Form.Item>
</div>
<div className="">
<span className="text-[16px] font-inter font-medium">
Mobile No.
</span>
<Form.Item
  name="mobileNo"
  rules={[
    {
      required: true,
    },
  ]}
>
<Input
name="mobileNo"
onChange={setTextChange}
placeholder="Enter Mobile No."
size="large"
/>
</Form.Item>
</div>
<div className="">
<span className="text-[16px] font-inter font-medium">
Email
</span>
<Form.Item
  name="email"
  rules={[
    {
      required: true,
    },
  ]}
>
<Input
name="email"
onChange={setTextChange}
placeholder="Enter Email"
size="large"
/>
</Form.Item>
</div>
<div className="">
<span className="text-[16px] font-inter font-medium">
Heading
</span>
<Form.Item
  name="heading"
  rules={[
    {
      required: true,
    },
  ]}
>
<Input
name="textP"
onChange={setTextChange}
placeholder="Enter Heading"
size="large"
/>
</Form.Item>
</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
        
        <div className="">
<span className="text-[16px] font-inter font-medium">
Address
</span>
<Form.Item
  name="address"
  rules={[
    {
      required: true,
    },
  ]}
>
<TextArea
name="address"
onChange={setTextChange}
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
</Form.Item>
</div>
<div className="">
<span className="text-[16px] font-inter font-medium">
Descriptions
</span>
<Form.Item
  name="description"
  rules={[
    {
      required: true,
    },
  ]}
>
<TextArea
name="textContent"
onChange={setTextChange}
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
</Form.Item>
</div>
<div className=''>
<span className="text-[16px] font-inter font-medium">
Logo
</span>
<Form.Item name="logoImg"  valuePropName="fileList" getValueFromEvent={normFile}>
<Upload
name="avatar"
listType="picture-card"
className="avatar-uploader"
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
</Form.Item>
</div>

        </div>
        <Form.Item>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            className="rounded h-[40px] px-3 font-poppins text-[1.4rem] border border-mainDark"
          >
            Cancel
          </button>
          <button
            className="bg-mainDark text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
            type="sumbit"
          >
            Create Latter Pad
          </button>
        </div>
      </Form.Item>
        
        </Form>
    </div>
  )
}

export default LatterPadForm