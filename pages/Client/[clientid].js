import Layout from '@/Components/Layout'
import React,{useState,useEffect} from 'react'
import Router,{useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons';
import styles from "../../styles/ClientMobileTable.module.css"
// import { getClientDataUrl, UpdateClient } from '@/Api/Url';
import { Button, Input, message, Popconfirm } from "antd";
import axios from "axios";
import { getSession, useSession, signOut } from "next-auth/react"
import { MdDelete } from "react-icons/md";

import { ApiEndPoint } from '@/public/ApiEndPoint';
const ClientInfo = () => {
  const { data: session } = useSession()
    let UserId = "";
    let token;
    if (typeof localStorage != undefined) {
      UserId = localStorage.getItem("UserId");
      token = localStorage.getItem("token");
    }
  const [messageApi, contextHolder] = message.useMessage()

const router=useRouter()
const{query}=router
const { TextArea } = Input;
const[clientData,setClientData]=useState(JSON.parse(localStorage.getItem("ClientData")))


let newData = [JSON.parse(localStorage.getItem("ClientData"))]
const[clientUpdate,setClientUpdate]=useState({...newData[0]})
const UpdateClientHandler=(e)=>{
  const { name, value } = e.target;
  setClientUpdate({
    ...clientUpdate,
    [name]: value,
  });
}
function messageAlert(type,content){
  const key = 'updatable';

messageApi.open({
    key,
    type,
    content,
  })
}

const UpdateBtnhandler=async()=>{
  messageAlert('loading','Editing Client...')
  try {
   
const obj = {
  id: clientUpdate._id,
  name: clientUpdate.name,
  address: clientUpdate.address,
  phoneNo: clientUpdate.phoneNo,
  email: clientUpdate.email,
  userId: clientUpdate.userId,
};
    await axios
      .put(`${ApiEndPoint}client/`, obj)
      .then((response) => {
         messageAlert('success','Succesfully Updated Client')
          
      })
      .catch((error) => {
      messageAlert('error',error.message)

      });
         
 
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
}
const DeleteClient=async()=>{
 messageAlert("loading", "Deleting Grade...");
 

       const response = await fetch(`${ApiEndPoint}client/`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
           Connection: "Keep-Alive",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
           id: clientUpdate._id,
           userId: clientUpdate.userId,
         }),
       });
       const data = await response.json();
       console.log("data", data);
       if (response.ok) {
         console.log("Data saved to database");
           messageAlert("success", "Succesfully Deleted Grade");
       router.push("/Category");
       } else {
        messageAlert("error", "Error deleting...");

         console.error("Error saving data to database");
       }
}
  return (
    <Layout title="client">
      {contextHolder}
      <div className={styles.ClientInfo_box}>
        <div className={styles.heading}>
          <span
            className={styles.arrow_left}
            onClick={() => router.push("/Category")}
          >
            <LeftOutlined className={styles.icons_client} />
          </span>
          <h4>Client Info</h4>
          <div className="">
            <Popconfirm
              title={`Delete the ${clientUpdate.name}`}
              description="Are you sure to delete this client?"
              onConfirm={() => DeleteClient()}
            >
              <MdDelete className={styles.icon_delete} />
            </Popconfirm>
          </div>
        </div>

        <div className={styles.client_infobox}>
          <div className={styles.input_client}>
            <label>Name</label>
            <Input
              value={clientUpdate.name}
              name="name"
              placeholder="Basic usage"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client}>
            <label>Email</label>
            <Input
              value={clientUpdate.email}
              name="email"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client}>
            <label>Phone No.</label>
            <Input
              value={clientUpdate.phoneNo}
              name="phoneNo"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client} style={{ height: "113px" }}>
            <label>Address</label>
            <TextArea
              className={styles.text_client}
              showCount
              name="address"
              value={clientUpdate.address}
              maxLength={100}
              onChange={UpdateClientHandler}
            />
          </div>

          <Button
            type="primary"
            className={styles.updateButton}
            onClick={UpdateBtnhandler}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default ClientInfo

export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}