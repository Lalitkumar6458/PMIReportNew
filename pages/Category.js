import Layout from '@/Components/Layout'
import React, { useState, useEffect } from 'react'
import styles from "../styles/Category.module.css"
import { Input, Tooltip, AutoComplete, message, Modal } from "antd";
import Button from '@/Components/SmallComponets/Button'
import { UserAddOutlined } from '@ant-design/icons';
import ClientTable from '@/Components/SmallComponets/ClientTable'
import axios from 'axios'
import EditTable from '@/Components/SmallComponets/EditTable'
import {HiArrowNarrowDown,HiArrowNarrowUp } from "react-icons/hi";
import { getSession, useSession, signOut } from "next-auth/react"
import { ApiEndPoint } from '@/public/ApiEndPoint';
import ClientAdd from '@/Components/FormCon/ClientAdd';


const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input a number'
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter Phone no."
        maxLength={10}
      />
    </Tooltip>
  );
};

const initialState={
  name:"",
  email:"",
  phone:"",
  address:""
}
const Category = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data: session } = useSession()
  const [smallbox,setSmallbox]=useState(false)
  const [value, setValue] = useState('');
  const[clientData,setClientData]=useState([])
  const[clientInfo,setClientInfo]=useState(initialState)
  let UserId = "";
  let token;
  if (typeof localStorage != undefined) {
    UserId = localStorage.getItem("UserId");
    token = localStorage.getItem("token");
  }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

  function messageAlert(type,content){
    const key = 'updatable';

 messageApi.open({
      key,
      type,
      content,
    })
  }
const AddClient=()=>{
  messageAlert('loading','Adding your Client...')
  clientInfo["phone"]=value
  clientInfo["username"]=session.user.name
  clientInfo["Useremail"]=session.user.email
  axios.post(`${ApiEndPoint}save_client_info/`, clientInfo)
      .then((response) => {
       messageAlert('success','Succesfully Added Client')

        GetclientData() 
      })
      .catch((error) => {
        messageAlert('error',error.message)
      
        console.log(error,"error")
      })
}

const GetclientData=async()=>{

    messageAlert("loading", "Geting Client Data...");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data_obj = {
      userId: UserId,
    };
    await axios
      .get(`${ApiEndPoint}client/`, { params: data_obj })
      .then((response) => {
        console.log("response 7h", response);
        if (response.status == 200) {
           setClientData(response.data.data);
          messageAlert("success", "Succesfully Get all client data");
        }else if (response.status == 201) {
              setClientData(response.data.data);
              messageAlert("success", "Data Not Found");
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
  useEffect(() => {
    GetclientData()
  }, [])


const options = [
  {
    value: 'SS304L',
  },
  {
    value: 'SS316L',
  },
  {
    value: 'Inconel-600',
  },
];
const handleValueChange=(e)=>{
  setClientInfo({
    ...clientInfo,
    [e.target.name]:e.target.value
  })
}

    return (
      <Layout title="Category">
        {contextHolder}
        <div className={styles.Category_con}>
          <div className="flex items-center justify-end">
            <button
              className="bg-mainDark text-white font-inter text-[2rem] rounded-md py-3 px-3"
              onClick={showModal}
            >
              Add Client
            </button>
          </div>

          <div className={styles.Client_allData}>
            <div className={styles.search_box}>
              <AutoComplete
                style={{
                  width: 200,
                  border: "1px solid #081A51",
                  borderRadius: "5px",
                  popupClassName: "Search_input",
                }}
                options={options}
                placeholder="Search Grade Chemical.."
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div>

            <div className={styles.client_table}>
              <div className={styles.Client_cont}>
                <ClientTable
                  GetclientData={GetclientData}
                  dataObj={clientData}
                  messageAlert={messageAlert}
                />
              </div>
              <EditTable data={clientData} />
            </div>
          </div>
        </div>

        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div className="">
            <ClientAdd
              GetclientData={GetclientData}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </Modal>
      </Layout>
    );
  }
  


export default Category

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