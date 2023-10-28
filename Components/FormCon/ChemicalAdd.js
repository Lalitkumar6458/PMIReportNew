import { ApiEndPoint } from "@/public/ApiEndPoint";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import { useEffect } from "react";
const ChemicalAdd = ({
  setIsModalOpen,
  session,
  isEditGrade,
  EditGradeData,
  getAllChemicalData,
}) => {
  const [form] = Form.useForm();
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
  console.log("session", session);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // Replace with the actual JWT token

    // Set the Authorization header with the JWT token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data = {
      ...values,
      userId: UserId,
    };
    // Make an authenticated API request to the backend
    if (isEditGrade) {
      data["id"] = EditGradeData._id;
      axios
        .put(ApiEndPoint + "chemical", data)
        .then((response) => {
          // Handle the response from the backend
          console.log("response",response);
if(response.status==200){
    getAllChemicalData()
            setIsModalOpen(false);
                form.resetFields();


}
        })
        .catch((error) => {
          console.log("error", error);
          // Handle any errors or unauthorized access
        });
    } else {
      axios
        .post(ApiEndPoint + "chemical", data)
        .then((response) => {
          // Handle the response from the backend
          console.log("response".response);
          if (response.status == 200) {
            getAllChemicalData();
            setIsModalOpen(false)
            form.resetFields();
          }
        })
        .catch((error) => {
          console.log("error", error);
          // Handle any errors or unauthorized access
        });
    }
  };

  useEffect(() => {
    if (isEditGrade) {
      console.log("EditGradeData", EditGradeData);
      form.setFieldsValue({
        ...EditGradeData,
      });
    } else {
      form.setFieldsValue({
        grade: "",
        chemical: [],
      });
    }
  }, [isEditGrade,EditGradeData]);
  return (
    <div className="px-2">
      <h2 className="text-[1.8rem]">Add Grade Chemical</h2>
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
          Grade Name
        </label>
        <Form.Item
          name="grade"
          rules={[
            {
              required: true,
              message: "Missing Garde",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Grade Name" />
        </Form.Item>
        <Form.List name="chemical">
          {(fields, { add, remove }) => (
            <>
              <div className="flex items-center gap-3 w-full">
                <div className=" bg-mainDark font-poppins text-white flex items-center rounded-md py-2 h-[40px] w-[90%]">
                  <div className="w-[50%] pl-2">Element Name</div>
                  <div className="w-[50%] pl-2">Percentage(%)</div>
                </div>
                <div
                  onClick={() => add()}
                  className="bg-mainDark text-white flex items-center justify-center h-[40px] rounded-md w-[10%] text-[1.9rem] cursor-pointer"
                >
                  <PlusOutlined />
                </div>
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <div className="flex items-center gap-3 w-full mt-2 formClass">
                  <div className=" bg-[#8a9bd68c] font-poppins text-white flex items-center rounded-md py-2 h-[40px] w-[90%]">
                    <div className="w-[50%] pl-2 border-r border-hoverBlue">
                      <Form.Item
                        {...restField}
                        name={[name, "Element"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Element",
                          },
                        ]}
                      >
                        <Input
                          className="text-mainDark font-inter font-medium"
                          placeholder="Element Name"
                        />
                      </Form.Item>
                    </div>
                    <div className="w-[50%] pl-2 ">
                      <Form.Item
                        {...restField}
                        name={[name, "percent"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing percent",
                          },
                        ]}
                      >
                        <Input
                          className="text-mainDark font-inter font-medium"
                          placeholder="Percentage"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div
                    onClick={() => remove(name)}
                    className=" bg-[#8a9bd68c] text-[#081A51] flex items-center justify-center h-[40px] rounded-md w-[10%] text-[1.9rem] cursor-pointer"
                  >
                    <MinusCircleOutlined />
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>
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
              {isEditGrade?'Update':'Save'}
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChemicalAdd;
