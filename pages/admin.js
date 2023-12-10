import { ApiEndPoint } from '@/public/ApiEndPoint'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { ExclamationCircleFilled } from "@ant-design/icons";

import {
  Button,
  Modal,
  Checkbox,
  Switch,
  Radio,
  Space,
  Select,
  message,
  Input,
} from "antd";
import { LuView } from 'react-icons/lu';
import { Router, useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
const { confirm } = Modal;
function admin() {
  const router = useRouter();
  const { query } = router;
  const [messageApi, contextHolder] = message.useMessage();
  function messageAlert(type, content) {
    const key = "updatable";

    messageApi.open({
      key,
      type,
      content,
    });
  }
  const[userData,setUserData]=useState([])
  const[UserName,setUserName]=useState('')

  const[Password,setPassword]=useState('')

  const [isAdmin,setIsAdmin]=useState(false)
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
const getUsers=async()=>{
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const res=await axios.get(ApiEndPoint+"Admin")
console.log(res,'res')
if(res.status===200){
  setUserData(res.data.data)
}else{
  setUserData([])
}
}


    useEffect(()=>{
getUsers()
    },[])

    const showDeleteConfirm = (id) => {
      confirm({
        title: "Are you sure delete this User?",
        icon: <ExclamationCircleFilled />,
        content: "Delete This User",
        wrapClassName: "ConfirmModal p-6",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
   
          const Deletegrade = async () => {
            messageAlert("loading", "Deleting User...");
   
            const response = await fetch(`${ApiEndPoint}users`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Connection: "Keep-Alive",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: id,
              }),
            });
            const data = await response.json();
            console.log("data", data);
            if (response.ok) {
              console.log("Data saved to database");
   
              messageAlert("success", "Succesfully Deleted report");
              getUsers()
            } else {
              messageAlert("error", "Error deleting...");
   
              console.error("Error saving data to database");
            }
           
          };
           Deletegrade();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };
    const ViewDetailsUser=(id)=>{
      router.push("/Userview?userid="+id)
    }
    const GoBack=()=>{
      router.push("/")
  }
  const LoginAdmin=()=>{
if(UserName=='Nitesh@6458'&&Password=='Anita@1998'){
  setIsAdmin(true)
}else{
  setIsAdmin(false)
  messageAlert("error", "Invalid UserName Or Password");
}
  }
  return (
    <div className='w-full'>
    {contextHolder}
    <div className='h-[50px] w-full bg-mainDark text-white flex items-center px-3'>
    <div className=' text-[19px] cursor-pointer'>
    <FaArrowLeft onClick={GoBack}/>
    </div>
    </div>
{
  isAdmin?  <div className=''>

  <h1 className='mt-2'>
  PMI REPORT ADMIN
  </h1>
  <div className=''>
{
userData?.map((item)=>{
return   <div className='shadow-lg border p-2 rounded-md mb-2 flex items-center justify-between'>
<div className=' '>
<h1>{item.name}</h1>
<p>{item.email}</p>
<p>{item.password?item.password:"google Login"}</p>
</div>
<div className='flex items-center gap-3'>
<LuView className='text-[20px] text-yellow-700 cursor-pointer' onClick={()=>ViewDetailsUser(item._id)} />
<MdDelete className='text-[20px] text-red-700 cursor-pointer' onClick={()=>showDeleteConfirm(item._id)} />
</div>
</div>
})
}

  </div>
  </div>: <div className='w-full h-[400px] flex items-center justify-center'>
  
  <div className='w-[300px] shadow-md rounded p-3 mt-2 flex flex-col gap-2 items-center justify-center'>
  <Input placeholder="UserName" value={UserName} onChange={(e)=>setUserName(e.target.value)}/>
  <Input placeholder="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} />
  <Button onClick={LoginAdmin}>Submit</Button>
  </div>
  </div>
}
  
 
    </div>
  )
}

export default admin