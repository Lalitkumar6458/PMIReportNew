import { Form, InputNumber, Popconfirm, Table, Typography,Input } from 'antd';
import { useState,useEffect } from 'react';
import {FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DeleteOutlined } from '@ant-design/icons';
import styles from "../../styles/Category.module.css"
// import { UpdateClient, DeleteClient } from "@/Api/Url";
import axios from 'axios';
import { getSession, useSession, signOut } from "next-auth/react"
import { ApiEndPoint } from '@/public/ApiEndPoint';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ClientTable = ({ dataObj, messageAlert, GetclientData }) => {
  // var messageAlert = messageAlert;
  const { session, status } = useSession();
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  useEffect(() => {
    setData(dataObj);
  }, [dataObj]);
  const userInfo = useSession();

  const save = async (key, record) => {
    messageAlert("loading", "Editing Client...");
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(record, "rowfdmdkn");
      const obj = {
        id: record._id,
        name: row.name,
        address: row.address,
        phoneNo: row.phoneNo,
        email: row.email,
        userId: UserId,
      };
      await axios
        .put(`${ApiEndPoint}client/`, obj)
        .then((response) => {
          messageAlert("success", "Succesfully Updated Client");
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey("");
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey("");
          }
        })
        .catch((error) => {
          messageAlert("error", error.message);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };


  const DeleteClient=async(record)=>{

  messageAlert("loading", "Deleting Client...");

  const response = await fetch(`${ApiEndPoint}client/`, {
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
    messageAlert("success", "Succesfully Deleted Grade");
    // router.push("/Category");
  } else {
    messageAlert("error", "Error deleting...");
    console.error("Error saving data to database");
  }

  }
  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone No.",
      dataIndex: "phoneNo",
      width: "20%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div className={styles.buttonbox}>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key, record)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  Cancel
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                <FaEdit className={styles.icon_edit} />
              </Typography.Link>
            )}
            <span>
              {data.length >= 1 ? (
                <Popconfirm
                  title="Delete the Item"
                  description="Are you sure to delete this item?"
                  onConfirm={() => DeleteClient(record)}
                >
                  
                    <DeleteOutlined className={styles.icon_del} />
                  
                </Popconfirm>
              ) : null}
            </span>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSizeOptions: ["5"],
          pageSize: 5,
        }}
      />
    </Form>
  );
};
export default ClientTable;