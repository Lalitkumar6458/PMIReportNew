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
  id:clientUpdate.key,
client_name: clientUpdate.client_name,
client_address: clientUpdate.client_address,
client_phone_no: clientUpdate.client_phone_no,
client_email: clientUpdate.client_email,
user_info_id: clientUpdate.user_info_id,
email: session.user.email,
};
    await axios
      .post(`${ApiEndPoint}update_client_info/`, obj)
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
const DeleteClient=()=>{

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
              title="Delete the Item"
              description="Are you sure to delete this item?"
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
              value={clientUpdate.client_name}
              name="client_name"
              placeholder="Basic usage"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client}>
            <label>Email</label>
            <Input
              value={clientUpdate.client_email}
              name="client_email"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client}>
            <label>Phone No.</label>
            <Input
              value={clientUpdate.client_phone_no}
              name="client_phone_no"
              onChange={UpdateClientHandler}
            />
          </div>
          <div className={styles.input_client} style={{ height: "113px" }}>
            <label>Address</label>
            <TextArea
              className={styles.text_client}
              showCount
              name="client_address"
              value={clientUpdate.client_address}
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