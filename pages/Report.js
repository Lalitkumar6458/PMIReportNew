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
  Divider,
 Drawer, Radio,
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


  useEffect(()=>{
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
  return (
    <>
      <Layout title="Report">
        <div className={styles.report_con}>
          <BorderBox title={"Report Infomation"}>
            <div className="row">
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Party Name </label>
                  <Select
                    className={styles.Seletcbox}
                    showSearch
                    placeholder="Select a Party"
                    optionFilterProp="children"
                    onChange={(value) => commonOnChangeFun(value,setPartyName,"partyname")}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={partName}
                    value={partyname}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Agency Name</label>
                  <Input
                    placeholder=""
                    value={agencyName}
                    onChange={(e) => commonOnChangeFun(e.target.value,setAgencyName,'agencyName')}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label> PMI Location </label>
                  <Input
                    placeholder="Basic usage"
                    value={locationName}
                    onChange={(e) =>commonOnChangeFun(e.target.value,setLocationName,'locationName')}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Date</label>
                  {/* <DatePicker
                    onChange={onChangedate}
                    className={styles.datePicker}
                    value={date}
                    format="YYYY-MM-DD"
                  /> */}
                  <input className={styles.dateinput} type='date' value={date} onChange={(e)=> commonOnChangeFun(e.target.value,setDate,'date')} />  
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>PMI Rreport No.</label>
                  <Input
                    placeholder="Basic usage"
                    value={reportNo}
                    onChange={(e) => commonOnChangeFun(e.target.value,setReportNo,'reportNo') }
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Purchase Order</label>
                  <Input
                    placeholder="Basic usage"
                    value={poNo}
                    onChange={(e) => commonOnChangeFun(e.target.value,setPoNo,'poNo') }
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Instrument Id </label>
                  <Select
                    className={styles.Seletcbox}
                    showSearch
                    placeholder="Select a Instrument Id "
                    optionFilterProp="children"
                    onChange={(value) => commonOnChangeFun(value,setInstrumentValue,'instrumentValue')}
                    value={instrumentValue}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />

                        <div>
                          <Input
                            placeholder="Please enter Instrument Id No."
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                        </div>
                        <div>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItem}
                          >
                            Add Instrument Id/No.
                          </Button>
                        </div>
                      </>
                    )}
                    options={items2}
                  />
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className={styles.inputBox}>
                  <label>Modal No. </label>
                  <Select
                    className={styles.Seletcbox}
                    showSearch
                    placeholder="Select a Modal No."
                    optionFilterProp="children"
                    onChange={(value) => commonOnChangeFun(value,setModalNoValue,'modalNovalue')}
                    onSearch={onSearch}
                    value={modalNovalue}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />

                        <div>
                          <Input
                            placeholder="Please enter Modal No."
                            ref={inputRef1}
                            value={modalname}
                            onChange={onModalNameChange}
                          />
                        </div>
                        <div>
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addmodalNo}
                          >
                            Add Modal No.
                          </Button>
                        </div>
                      </>
                    )}
                    options={modalNo}
                  />
                </div>
              </div>
            </div>
          </BorderBox>

          <div className={styles.reportChemical}>
            <BorderBox title={"Alloys Contnets "}>
              <div className="row grade_report">
                <div className="col-12 col-md-3">
                  <div className={styles.inputBox}>
                    <label>Specified Goods</label>
                    <Select
                      className={styles.Seletcbox}
                      ref={selectRef}
                      showSearch
                      placeholder="Enter Grade name"
                      optionFilterProp="children"
                      onSelect={SelectedGrade}
                      onChange={(value) => commonOnChangeFun(value,setGradeName,'Gradename') }
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={specifiedGrade}
                      value={Gradename}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-9 align-self-center">
                  <div className={styles.GradeChemical}>
                    <div className={styles.GradeBox}>
                      <h4>Grade:{Gradename}</h4>
                    </div>

                   {Gradename?<div className={styles.chemicalTable}>
                      <table>
                        <thead>
                          <tr>
                            {Object.keys(gradeDataC).map((item,index) => {
                              return (
                                <th style={{ textTransform: "capitalize" }} key={index}>
                                  {item}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {Object.keys(gradeDataC).map((item,index) => {
                              return (
                                <td style={{ textTransform: "capitalize" }} key={index}>
                                  {gradeDataC[item]}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>: <div className={styles.InfoMassage}>
                      <h5>Select First Grade from Left Side DropDown </h5>
                    </div>}
                 
                  </div>
                </div>
              </div>
            </BorderBox>
            <div className={styles.table_con_view}>
              <div className={styles.tableView}>
                <button
                  className={tableview ? "" : `${styles.active}`}
                  onClick={() => Table_view1()}
                >
                  <BsMenuButtonWide />
                </button>
                <button
                  className={tableview ? `${styles.active}` : ""}
                  onClick={() => Table_view()}
                >
                  <BsTable />
                </button>
              </div>
              {tableview ? (
                <ReportTable data={addeddata} ref={childRef} gradeDataC={gradeDataC} Gradename={Gradename} />
              ) : (
                <Reportmobilelist gradeDataC={gradeDataC} Gradename ={Gradename}/>
              )}
            </div>

            <div className={styles.ButtonSave_sent}>
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
            </div>
          </div>
        </div>
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
