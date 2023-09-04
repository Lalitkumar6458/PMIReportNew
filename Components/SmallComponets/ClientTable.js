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
const ClientTable = (props) => {
  var messageAlert=props.messageAlert
 const{session,status}=useSession()

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  useEffect(()=>{
    setData(props.data)
  }, [props.data])
  const userInfo = useSession();

  const save = async (key) => {
     messageAlert('loading','Editing Client...')
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
const obj = {
  id: key,
  client_name: row.client_name,
  client_address: row.client_address,
  client_phone_no: row.client_phone_no,
  client_email: row.client_email,
  user_info_id: newData[index].user_info_id,
  email: userInfo.data.user.email,
};
      await axios
        .post(`${ApiEndPoint}update_client_info/`, obj)
        .then((response) => {
           messageAlert('success','Succesfully Updated Client')
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
        messageAlert('error',error.message)

        });
           
   
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'client_name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'client_email',
      width: '20%',
      editable: true,
    },
    {
      title: 'Phone No.',
      dataIndex: 'client_phone_no',
      width: '20%',
      editable: true,
     
    },
    {
      title: 'Address',
      dataIndex: 'client_address',
      width: '30%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return <div className={styles.buttonbox}>
          {
 editable ? (
  <span>
    <Typography.Link
      onClick={() => save(record.key)}
      style={{
        marginRight: 8,
      }}
    >
      Save
    </Typography.Link>
    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      <a>Cancel</a>
    </Popconfirm>
  </span>
) : (
  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
     <FaEdit className={styles.icon_edit}/>
  </Typography.Link>
  
) 
          }
<span>
{
            data.length >= 1 ? (
                <Popconfirm
                              title="Delete the Item"
                              description="Are you sure to delete this item?"
                              onConfirm={() => handleDelete(record.key)}
                            >

                              <a><DeleteOutlined className={styles.icon_del} /></a>
                            </Popconfirm>
             
            ) : null
          }
</span>
         
        </div>
       
       
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleDelete = async(key) => {
  messageAlert('loading','Deleting Client...')
const newData = data.filter((item) => item.key !== key);
const newData1 = [...data];
        const index = newData1.findIndex((item) => key === item.key);
   
    const obj = {
      id: key,
      email: userInfo.data.user.email,
      user_info_id: newData1[index].user_info_id,
    };
     await axios
       .delete(`${ApiEndPoint}delete_client_info/`, { params: obj })
       .then((response) => {
         console.log("success", response);
       messageAlert('success','Succesfully Delete Client')
       setData(newData);

       })
       .catch((error) => {
         console.log("error", error);
        messageAlert('error',error.message)

       });
  };
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
          pageSizeOptions: ['5'],
          pageSize: 5
        }}
       
      />
    </Form>
  );
};
export default ClientTable;