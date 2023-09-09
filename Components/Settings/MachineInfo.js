import { Form, Input, Modal, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';


const MachineInfo = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditData, setIsEditData] = useState(false);
       
      const [machineData,setmachineData]=useState([])
      const [EditmachineData, setEditmachineData] = useState({});

      const showAddModal = (type,data) => {
        if(type === 'Edit'){
setIsEditData(true)
setEditmachineData(data);
form.setFieldsValue({
  ...data,
});
        }else{
setIsEditData(false);
form.setFieldsValue({
  name: "",
  modalNo: "",
  instrumentId:"",
});
        }
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

       const [form] = Form.useForm();
       let UserId = "";
       let token;
       if (typeof localStorage != undefined) {
         UserId = localStorage.getItem("UserId");
         token = localStorage.getItem("token");
       }
const GetclientData = async () => {
//   messageAlert("loading", "Geting Client Data...");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const data_obj = {
    userId: UserId,
  };
  await axios
    .get(`${ApiEndPoint}machine/`, { params: data_obj })
    .then((response) => {
      console.log("response 7h", response);
      if (response.status == 200) {
        setmachineData(response.data.data);
        // messageAlert("success", "Succesfully Get all client data");
      } else if (response.status == 201) {
        setmachineData(response.data.data);
        // messageAlert("success", "Data Not Found");
      }
    })
    .catch((error) => {
      // dispatch({
      //   type: ERROR_FINDING_USER
      // })
      console.log(error, "error");
    //   messageAlert("error", error.message);
    });
};
useEffect(() => {
  GetclientData();
}, []);


       const onFinish = (values) => {
         console.log(values, "values");
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         const data = {
           ...values,
           userId: UserId,
         };

         if (isEditData){
            data["id"] = EditmachineData._id
   axios
     .put(ApiEndPoint + "machine", data)
     .then((response) => {
       // Handle the response from the backend
       console.log("response".response);
       if (response.status == 200) {
         //    getAllChemicalData();
         setIsModalOpen(false);
         GetclientData();
       }
     })
     .catch((error) => {
       console.log("error", error);
       // Handle any errors or unauthorized access
     });
         }else{
   axios
     .post(ApiEndPoint + "machine", data)
     .then((response) => {
       // Handle the response from the backend
       console.log("response".response);
       if (response.status == 200) {
         //    getAllChemicalData();
         setIsModalOpen(false);
         GetclientData();
       }
     })
     .catch((error) => {
       console.log("error", error);
       // Handle any errors or unauthorized access
     });
         }
        
       };
    const Deletegrade = async (record) => {
    //   alert("delete");
      const response = await fetch(`${ApiEndPoint}machine/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Connection: "Keep-Alive",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: record._id,
          userId: record.userId,
        }),
      });
      const dataObj = await response.json();
      console.log("data", dataObj);
      GetclientData();
      if (response.status == 200) {
        console.log("Data saved to database");
        // messageAlert("success", "Succesfully Deleted Grade");
        // router.push("/Category");
      } else {
        // messageAlert("error", "Error deleting...");
        console.error("Error saving data to database");
      }
    };
  return (
    <div>
      <div className="flex items-center justify-end pr-3 py-3">
        <button
          onClick={() => showAddModal("Create")}
          className="bg-mainDark rounded-md text-[1.4rem] font-inter font-medium text-white h-[40px] px-3 flex items-center justify-center"
        >
          Add Machine
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className=" bg-hoverBlue text-white font-roboto text-[1.5rem] h-[40px]">
              <th className="pl-3">Name</th>
              <th>Modal No.</th>
              <th>Instrument Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {machineData.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className="h-[40px] shadow-md font-inter font-medium text-[1.5rem]"
                >
                  <td className="pl-3">{item.name}</td>
                  <td>{item.modalNo}</td>
                  <td>{item.instrumentId}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <FaEdit
                        onClick={() => showAddModal("Edit", item)}
                        className="text-[18px] cursor-pointer"
                      />
                      <Popconfirm
                        title={"Delete the Grade: "}
                        description="Are you sure to delete this machine?"
                        onConfirm={() => Deletegrade(item)}
                        icon={
                          <QuestionCircleOutlined
                            style={{
                              color: "red",
                            }}
                          />
                        }
                      >
                        <button>
                          <MdDelete className="text-[20px] text-red-800 cursor-pointer" />
                        </button>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="py-3 px-3">
          <div className="w-full px-4 py-4">
            <h2>Add New Machine Info</h2>

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
                Machine Name
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
                Machine Modal No
              </label>
              <Form.Item
                name="modalNo"
                rules={[
                  {
                    required: true,
                    message: "Missing ModalNo",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter ModalNo" />
              </Form.Item>
              <label className="text-[1.5rem] font-inter font-medium">
                Machine InstrumentId.
              </label>
              <Form.Item
                name="instrumentId"
                rules={[
                  {
                    required: true,
                    message: "Missing InstrumentId.",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter InstrumentId" />
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
        </div>
      </Modal>
    </div>
  );
}

export default MachineInfo