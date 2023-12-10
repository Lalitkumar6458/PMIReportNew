import React, { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';
import {
    Button,
    Modal,
    Checkbox,
    Switch,
    Radio,
    Space,
    Select,
    message,
  } from "antd";
import { FaArrowLeft } from 'react-icons/fa';
const Userview = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const { query } = router;

    function messageAlert(type, content) {
        const key = "updatable";
    
        messageApi.open({
          key,
          type,
          content,
        });
      }
      const [UserAllData,setUserAllData]=useState({})
    console.log(query.userid,"query")
    let UserId = query.userid;
    let token;
    if (typeof localStorage != undefined) {
      UserId = query.userid;
      token = localStorage.getItem("token");
    }
    const getAdminUserData=async()=>{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const data_obj = {
            userId:query.userid
                };
                await axios
                  .get(
                    `${ApiEndPoint}Chemical/`,
                    { params: data_obj },
                  )
                  .then((response) => {
                    console.log("response 7h", response);
                    if (response.status==200){
                    //   setAllGradeData(response.data.data);
                      messageAlert("success", "Succesfully Get all Grade Chemical data");
                    }
                  })
                  .catch((error) => {
                    // dispatch({
                    //   type: ERROR_FINDING_USER
                    // })
                    console.log(error, "error");
                    messageAlert("error", error.message);
                  });


                  await axios
                  .get(
                    `${ApiEndPoint}Client/`,
                    { params: data_obj },
                  )
                  .then((response) => {
                    console.log("response 7h", response);
                    if (response.status==200){
                    //   setAllGradeData(response.data.data);
                      messageAlert("success", "Succesfully Get all Client data");
                    }
                  })
                  .catch((error) => {
                    // dispatch({
                    //   type: ERROR_FINDING_USER
                    // })
                    console.log(error, "error");
                    messageAlert("error", error.message);
                  });

                  await axios
                  .get(
                    `${ApiEndPoint}Report/`,
                    { params: data_obj },
                  )
                  .then((response) => {
                    console.log("response 7h", response);
                    if (response.status==200){
                    //   setAllGradeData(response.data.data);
                    console.log(response.data,'response.data.data')
                    setUserAllData(response.data)
                      messageAlert("success", "Succesfully Get all Report data");
                    }
                  })
                  .catch((error) => {
                    // dispatch({
                    //   type: ERROR_FINDING_USER
                    // })
                    console.log(error, "error");
                    messageAlert("error", error.message);
                  });
    }
    useEffect(()=>{
        getAdminUserData()
    },[])
    const GoBack=()=>{
        router.push("/admin")
    }
  return (  
    <div>
    {contextHolder}

    <div className=''>
    <div className='h-[50px] w-full bg-mainDark text-white flex items-center px-3'>
    <div className=' text-[19px] cursor-pointer'>
    <FaArrowLeft onClick={GoBack}/>
    </div>
    </div>
    </div>
    <div className='flex items-center justify-center gap-3 mt-4'>
    <div className=' shadow-md border flex items-center justify-center flex-col p-2 rounded'>
    <h4>{UserAllData?.dashbordData?.ChemicalLen||0}</h4>
<h2>Grade</h2>
    </div>
    <div className=' shadow-md border flex items-center justify-center flex-col p-2 rounded'>
    <h4>{UserAllData?.dashbordData?.ClientLen||0}</h4>
<h2>Client</h2>
    </div>
    <div className=' shadow-md border flex items-center justify-center flex-col p-2 rounded'>
    <h4>{UserAllData?.dashbordData?.ReportLen||0}</h4>
<h2>Report</h2>
    </div>
    </div>
    </div>
  )
}

export default Userview