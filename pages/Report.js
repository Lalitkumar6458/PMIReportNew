import Layout from "@/Components/Layout";
import React, { useState,useRef, useEffect } from "react";
import BorderBox from "@/Components/SmallComponets/BorderBox";
import styles from "../styles/ReportPage.module.css";
import pdficon from "../public/Images/pdficon.png"
import printicon from "../public/Images/printicon.png"
import excelicon from "../public/Images/excelicon.png"
import wordicon from "../public/Images/wordicon.png"
import wapp from "../public/Images/wappicon.png"
import email from "../public/Images/email.png"
import Image from "next/image";
import moment from 'moment';
import dayjs from "dayjs"
import { ApiEndPoint } from "@/public/ApiEndPoint";
import {
  FileWordOutlined,
  UserOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SaveOutlined,
  SendOutlined,
  PlusOutlined
} from "@ant-design/icons";
import {
  Select,
  Input,
  Button,
  Dropdown,
  Form,
  Divider,
 Drawer, Radio,
 DatePicker
} from "antd";
import ReportTable from "@/Components/Reportcomponents/ReportTable";
import { BsTable, BsMenuButtonWide } from "react-icons/bs";
import Router from "next/router";
import Reportmobilelist from "@/Components/Reportcomponents/Reportmobilelist";
import { getSession, useSession, signOut } from "next-auth/react"
import axios from "axios";

let allData=[]
var count=1
const Report = ({ reportData,session }) => {
  console.log(reportData, "reportData")
  const selectRef = useRef(null);
  const [allReportdata, setAllReportData] = useState({});
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [tableview, setTableview] = useState(false);
  const[getAllData,setGetAllData]=useState({})
  const [SelecteGradeData, setSelecteGradeData] = useState({});

  const [AgencyUser, setAgencyUser] = useState('');

    const [form] = Form.useForm();
       let UserId = "";
       let token;
       if (typeof localStorage != undefined) {
         UserId = localStorage.getItem("UserId");
         token = localStorage.getItem("token");
       }
  const onFinish = (values) => {
    console.log(values,"report forms")
  }
  const [items2, setItems2] = useState(reportData?.instrument_id?reportData?.instrument_id?.map((item,index)=>{
    return{
      value:item,
      label:item,
      key:index
    }
  }):[]);
  const [modalNo, setModalNo] = useState(reportData?.model_info?
    reportData?.model_info?.map((item,index)=>{
      return{
        value:item,
        label:item,
        key:index
      }
    }):[])
  
  const [name, setName] = useState("");
  const [modalname, setModalName] = useState("");
  const [addeddata, setAddeddata] = useState([]);
const [gradeDataC,setGradeDataC]=useState({})

const[api_endpoint,setApiEndpoint]=useState(ApiEndPoint)
  


  const childRef = useRef();

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  const [placement, setPlacement] = useState("bottom");
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClose1 = () => {
    setOpen1(false);
  };


  const onSearch = (value) => {
    console.log("search:", value);
  };


  const current = new Date();

  const handleMenuClick = (e) => {


const reportAddedData=JSON.parse(localStorage.getItem("reportAddedData"))
const DataReport={
  partyname,agencyName,locationName,reportNo,poNo,date,instrumentValue,modalNovalue,Gradename,gradeDataC,reportAddedData
}
 

    localStorage.setItem("ReportAllDAta", JSON.stringify(DataReport));
    setAllReportData({ ...DataReport });

    var url = "/ReportPdf";
    Router.push(
      { pathname: url, query: { data: JSON.stringify(DataReport) } },
      url
    );
    //  Router.push("/ReportPdf")
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onModalNameChange = (event) => {
    setModalName(event.target.value);
  };
  let index = 0;
  const addItem = async(e) => {
    console.log(items2,"items2")
    e.preventDefault();
    setItems2([
      ...items2,
      {
        value: name,
        label: name,
      } || `New item ${index++}`,
    ]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    try{
      const objData={
        instrument_id:name,
        user_email:session.user.email,
       }
    let resData= await axios.post(`${ApiEndPoint}instrument_info/`,objData)
    }catch(error){
  console.log("error",error)
    }
   
  };
  const addmodalNo = async (e) => {
    e.preventDefault();
    setModalNo([
      ...modalNo,
      {
        value: modalname,
        label: modalname,
      } || `New item ${index++}`,
    ]);
    setModalName("");
    setTimeout(() => {
      inputRef1.current?.focus();
    }, 0);
    try{
      const objData={
        model_info:modalname,
        user_email:session.user.email
       }
    let resData= await axios.post(`${ApiEndPoint}set_model_info/`,objData)
    }catch(error){
  console.log("error",error)
     
    }
     
  };
  const items = [
    {
      label: "PDF",
      key: "1",
      icon: <FilePdfOutlined />,
      onclick_handler: function () {
        alert("click");
      },
    },
    {
      label: "MS WORD DOC",
      key: "2",
      icon: <FileWordOutlined />,
    },
    {
      label: "Excel",
      key: "3",
      icon: <FileExcelOutlined />,
    },
    {
      label: "Print",
      key: "4",
      icon: <PrinterOutlined />,
    },
  ];

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
let todayData=dd+"-"+mm+"-"+yyyy
console.log("todayData", todayData);
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const Table_view = () => {
    setTableview(true);
  };
  const Table_view1 = () => {
    setTableview(false);
  };
let Specgrade=reportData?.grade_name?.map((item,index)=>{
  return {
    value:item,
    key:index,
    label:item,
  }
})||[]
// Get the current date
var currentDate = new Date();
let getDataLocal=JSON.parse(localStorage.getItem('CreatedData'))||null

// Format the date as "YYYY-MM-DD" (required by the input type="date")
var formattedDate = currentDate.toISOString().slice(0, 10);
const [partyname, setPartyName] = useState(getDataLocal?getDataLocal.partyname:"");

  const [agencyName, setAgencyName] = useState(getDataLocal?getDataLocal.agencyName:reportData?.user_info);
  const [locationName, setLocationName] = useState(getDataLocal?getDataLocal.locationName:"Mumbai");
  const [reportNo, setReportNo] = useState(getDataLocal?getDataLocal.reportNo:'');
  const [poNo, setPoNo] = useState(getDataLocal?getDataLocal.poNo:'');
  const [date, setDate] = useState(getDataLocal?getDataLocal.date == ''?formattedDate:getDataLocal.date:formattedDate);
  const [specifiedGrade, setSpecifiedGrade] = useState([
    ...Specgrade
  ]);
  const [modalNovalue, setModalNoValue] = useState(getDataLocal?getDataLocal.modalNovalue:"");
  const [Gradename, setGradeName] = useState(getDataLocal?getDataLocal.Gradename:"");

  const [instrumentValue, setInstrumentValue] = useState(getDataLocal?getDataLocal.instrumentValue:"");

  const partName = reportData?.user_based_client?.map((item,index)=>{
    return {
value:item.client_name,
label:item.client_name,
key:index,
    }
  })||[]
  
  const getGradeChemical=async(value)=>{
    console.log("value getGradeChemical", value);
     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
     const data_obj = {
       userId: UserId,
       grade: value,
     };
     await axios
       .get(`${ApiEndPoint}getgradedata/`, { params: data_obj })
       .then((response) => {
         console.log("response 7h", response);
         if (response.status == 200) {
            setSelecteGradeData(response.data.data[0]);
           // messageAlert("success", "Succesfully Get all client data");
         } else if (response.status == 201) {
            setSelecteGradeData(response.data.data[0]);

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


  }

  const CreatePdf = () => {
    alert("hell" + partyname);

    // Router.push("/ReportPdf")
  };
  const SelectedGrade=async(value)=>{
    try{
      const objData={
        grade_name:value,
        user_email:session.user.email
       }
    let resData= await axios.get(`${ApiEndPoint
    }chemical_based_on_grade/`,{params:objData})

    if(resData.status === 200){
      console.log("resData.data[0].chemical_name",typeof resData.data[0].chemical_name)
    setGradeDataC(resData.data[0].chemical_name)
  }else{
    console.log(resData,"data not get from backemd")

  }
    }catch(error){
  console.log("error",error)
     
    }

  }
  const getallData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data_obj = {
      userId: UserId,
    };
    await axios
      .get(`${ApiEndPoint}getalldata/`, { params: data_obj })
      .then((response) => {
        console.log("response 7h", response);
        if (response.status == 200) {
          setGetAllData(response.data.data);
          // messageAlert("success", "Succesfully Get all client data");
        } else if (response.status == 201) {
          setGetAllData(response.data.data);
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


  useEffect(()=>{
    getallData()
    let getDataLocal=localStorage.getItem('CreatedData')
    if(
      getDataLocal
    ){
      localStorage.setItem("CreatedData",JSON.stringify({...JSON.parse(getDataLocal),'locationName':locationName,'agencyName':agencyName}))
      // $('#GradeId').trigger('change');
      // selectRef.current.props.onChange();
      if(JSON.parse(getDataLocal)?.Gradename){
        // getGradeChemical(JSON.parse(getDataLocal)?.Gradename)
        SelectedGrade(JSON.parse(getDataLocal)?.Gradename)
      }
    }else{
      localStorage.setItem("CreatedData",JSON.stringify({'locationName':locationName,'agencyName':agencyName}))
    }

  },[])
  useEffect(() => {
setAgencyUser(getAllData?.UserData?.name);
console.log("etAllData?.UserData?.name", getAllData?.UserData?.name);
  }, [getAllData]);
  const commonOnChangeFun=(value,setvalue,name)=>{

setvalue(value)

    if (name === "partyname"){
      const userSelected = reportData?.user_based_client?.filter((item) => item.client_name === value)
      console.log("userSelected", userSelected)
      localStorage.setItem('ClientSelected',JSON.stringify(userSelected[0]))
}

  let getDataLocal=localStorage.getItem('CreatedData')
  if(
    getDataLocal
  ){
    localStorage.setItem("CreatedData",JSON.stringify({...JSON.parse(getDataLocal),[name]:value}))
  }
  else{
    localStorage.setItem("CreatedData",JSON.stringify({[name]:value}))
  }
  }
  console.log("todayData formfdjvh", todayData);
  return (
    <>
      <Layout title="Report">
        <Form
          className=""
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{
            date: dayjs(todayData, "DD-MM-YYYY"),
            agencyName: AgencyUser,
          }}
        >
          <div className={styles.report_con}>
            <BorderBox title={"Report Infomation"}>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 px-2">
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Client Name
                  </span>
                  <Form.Item
                    name="clientName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      className={styles.Seletcbox}
                      size="large"
                      showSearch
                      placeholder="Select a Client"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={getAllData?.ClientData?.map((item) => {
                        return {
                          label: item.name,
                          value: item.name,
                        };
                      })}
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
                      defaultValue={getAllData?.UserData?.name}
                      placeholder="Enter Agency Name"
                      size="large"
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    PMI Location
                  </span>
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Pmi Location" size="large" />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Date
                  </span>
                  <Form.Item
                    name="date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      size="large"
                      className="w-full"
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    PMI Report No.
                  </span>
                  <Form.Item
                    name="pmiReportNo"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Pmi Report No" size="large" />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Purchase Order
                  </span>
                  <Form.Item
                    name="poNo"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Purchase Order" size="large" />
                  </Form.Item>
                </div>

                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Instrument Id
                  </span>
                  <Form.Item
                    name="InstrumentId"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Select
                      className={styles.Seletcbox}
                      size="large"
                      showSearch
                      placeholder="Select a Instrument Id"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={getAllData?.MachineData?.map((item) => {
                        return {
                          label: item.instrumentId,
                          value: item.instrumentId,
                        };
                      })}
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Modal No.
                  </span>
                  <Form.Item
                    name="ModalNo"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Select
                      className={styles.Seletcbox}
                      size="large"
                      showSearch
                      placeholder="Select Modal No."
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={getAllData?.MachineData?.map((item) => {
                        return {
                          label: item.modalNo,
                          value: item.modalNo,
                        };
                      })}
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    PO Date
                  </span>
                  <Form.Item
                    name="poDate"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <DatePicker className="w-full" size="large" />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Lot No.
                  </span>
                  <Form.Item
                    name="lotNo"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Lot No." size="large" />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Vendor
                  </span>
                  <Form.Item
                    name="vendor"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Vendor" size="large" />
                  </Form.Item>
                </div>
                <div className="">
                  <span className="text-[16px] font-inter font-medium">
                    Bluk Item Types
                  </span>
                  <Form.Item
                    name="blukItemType"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Bluk Item Types" size="large" />
                  </Form.Item>
                </div>
              </div>
            </BorderBox>

            <div className={styles.reportChemical}>
              <BorderBox title={"Alloys Contnets "}>
                <div className="flex items-center flex-col lg:flex-row gap-5 px-4">
                  <div className="w-full lg:w-[25%]">
                    <div className={`${styles.inputBox} w-full`}>
                      <label>Specified Goods</label>
                      <div className="w-full">
                        <Form.Item
                          name="Grade"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            className={styles.Seletcbox}
                            size="large"
                            showSearch
                            onChange={getGradeChemical}
                            placeholder="Select Grade"
                            optionFilterProp="children"
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={getAllData?.ChemicalData?.map((item) => {
                              return {
                                label: item.grade,
                                value: item.grade,
                              };
                            })}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full lg:w-[75%] align-self-center">
                    <div className={styles.GradeChemical}>
                      <div className={styles.GradeBox}>
                        <h4>Grade:{SelecteGradeData?.grade}</h4>
                      </div>

                      {SelecteGradeData?.chemical ? (
                        <div className={styles.chemicalTable}>
                          <table>
                            <thead>
                              <tr>
                                {SelecteGradeData?.chemical?.map(
                                  (item, index) => {
                                    return (
                                      <th
                                        style={{ textTransform: "capitalize" }}
                                        key={index}
                                      >
                                        {item.Element}
                                      </th>
                                    );
                                  }
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {SelecteGradeData?.chemical?.map(
                                  (item, index) => {
                                    return (
                                      <td
                                        style={{ textTransform: "capitalize" }}
                                        key={index}
                                      >
                                        {item.percent}
                                      </td>
                                    );
                                  }
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className={styles.InfoMassage}>
                          <h5>Select First Grade from Left Side DropDown </h5>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </BorderBox>
              <div className={styles.table_con_view}>
                <div className={styles.tableView}>
                  <button
                    type="button"
                    className={tableview ? "" : `${styles.active}`}
                    onClick={() => Table_view1()}
                  >
                    <BsMenuButtonWide />
                  </button>
                  <button
                    type="button"
                    className={tableview ? `${styles.active}` : ""}
                    onClick={() => Table_view()}
                  >
                    <BsTable />
                  </button>
                </div>
                {tableview ? (
                  <ReportTable
                    data={addeddata}
                    ref={childRef}
                    gradeDataC={SelecteGradeData}
                    Gradename={Gradename}
                  />
                ) : (
                  <Reportmobilelist
                    gradeDataC={SelecteGradeData}
                    Gradename={Gradename}
                    chemicalRange={SelecteGradeData?.chemical}
                  />
                )}
              </div>

              {/* <div className={styles.ButtonSave_sent}>
                <span className={styles.save_btndrop}>
                  <Dropdown.Button
                    menu={menuProps}
                    placement="bottom"
                    icon={<UserOutlined />}
                  >
                    Save Report
                  </Dropdown.Button>
                </span>
                <button className={styles.saveButton} onClick={showDrawer1}>
                  Send
                  <SendOutlined />
                </button>
                <button className={styles.saveButton} onClick={showDrawer}>
                  Save <SaveOutlined />
                </button>
              </div> */}
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
                Create Report
              </button>
            </div>
          </Form.Item>
        </Form>
        <Drawer
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <div className={styles.drawer_button}>
            <div className="row">
              <div className="col-6">
                <button
                  className={styles.btndrawer}
                  onClick={() => handleMenuClick()}
                >
                  PDF <Image src={pdficon} alt="" />
                </button>
              </div>
              <div className="col-6">
                <button className={styles.btndrawer}>
                  Print <Image src={printicon} alt="" />
                </button>
              </div>
              <div className="col-6">
                <button className={styles.btndrawer}>
                  Excel <Image src={excelicon} alt="" />
                </button>
              </div>
              <div className="col-6">
                <button className={styles.btndrawer}>
                  MS Word <Image src={wordicon} alt="" />
                </button>
              </div>
            </div>
          </div>
        </Drawer>

        <Drawer
          placement={placement}
          closable={false}
          onClose={onClose1}
          open={open1}
          key={placement}
        >
          <div className={styles.drawer_button}>
            <div className="row">
              <div className="col-6">
                <button className={`${styles.btndrawer} ${styles.whatsapp}`}>
                  Whatsapp <Image src={wapp} alt="" />
                </button>
              </div>
              <div className="col-6">
                <button className={styles.btndrawer}>
                  Email <Image src={email} alt="" />
                </button>
              </div>
            </div>
          </div>
        </Drawer>
      </Layout>
    </>
  );
};

export default Report;

export async function getServerSideProps({ req }){
  const session = await getSession({ req })


try{
  let data = {
     email: session.user.email,
   };

   const res = await axios.get(`${ApiEndPoint}report_info_party_name/`, { params: data });
 if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session,reportData: res.data },
  };
}catch(e){
  console.error("Error in date fetching",e)
return {
    props: { session,reportData:{} },
  };
}
 




 
}
