import React,{useEffect, useRef, useState} from 'react'
import MyDocument from '@/Components/ReportPdf/ReportPdfFormat'
// import { Image } from "antd";
import {
  PDFViewer,
  usePDF,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {LuView} from "react-icons/lu"
import { ExclamationCircleFilled } from "@ant-design/icons";
import { AiFillPrinter, AiOutlineDelete, AiOutlineSend,AiOutlineClose } from "react-icons/ai";
import css from "../styles/ReportPage.module.css"

import Image from 'next/image';
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
import Layout from '@/Components/Layout';
import axios from 'axios';

import { getSession, useSession, signOut } from "next-auth/react"
import { ApiEndPoint } from '@/public/ApiEndPoint';
import { useRouter } from 'next/router';
import { MdFileDownload } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { RiPagesLine } from 'react-icons/ri';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const { confirm } = Modal;
const ReportPdf = () => {

      const [messageApi, contextHolder] = message.useMessage();

      function messageAlert(type, content) {
        const key = "updatable";

        messageApi.open({
          key,
          type,
          content,
        });
      }
  const router = useRouter();
  const { query } = router;

 
  if(localStorage != undefined){
  }
  const session = useSession()
  const[isLaterPadCreated,setIsLaterPadCreated]=useState(false)
const[latterPadData,setLatterPadData]=useState({})
 const [isModalOpen, setIsModalOpen] = useState(false);
 const reportSetData = JSON.parse(localStorage.getItem("ReportCreatedData"));
const[withLatter,setWithLatterPad]=useState(false)
const [islaterPadSelected, setIslaterPadSelected] = useState(false);
const [openViewReport,setOpenViewReport]=useState(false)
const[pdfurl,setPdfUrl]=useState('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf')
const [pdfReady, setPdfReady] = useState(false);
const [LatterPadNo, setLatterPadNo] = useState();
    let UserId = "";
    let token;
    if (typeof localStorage != undefined) {
      UserId = localStorage.getItem("UserId");
      token = localStorage.getItem("token");
    }
 const handleOk = () => {
   setIsModalOpen(false);
 };
 const handleCancel = () => {
   setIsModalOpen(false);
 };

         var data=JSON.parse(localStorage.getItem("ReportAllDAta"))
        const[formateNo,setFormateNo]=useState(1)
 const showDeleteConfirm = () => {
   confirm({
     title: "Are you sure delete this Report?",
     icon: <ExclamationCircleFilled />,
     content: "Delete This Report",
     wrapClassName: "ConfirmModal p-6",
     okText: "Yes",
     okType: "danger",
     cancelText: "No",
     onOk() {

       const Deletegrade = async () => {
         messageAlert("loading", "Deleting Grade...");

         const response = await fetch(`${ApiEndPoint}report/`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             Connection: "Keep-Alive",
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({
             id: reportSetData._id,
             userId: UserId,
           }),
         });
         const data = await response.json();
         console.log("data", data);
         if (response.ok) {
           console.log("Data saved to database");

           messageAlert("success", "Succesfully Deleted report");
           router.push("/")
            localStorage.removeItem("reportAddedData");
            localStorage.removeItem("EditReportData");
            localStorage.removeItem("ReportCreatedData");
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


const fileName = `${reportSetData?.clientName}_${reportSetData?.grade}_${reportSetData?.date?.split('T')[0].replaceAll('-','')}`;
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  // Usage example
  // const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
  // fetch(blobURL)
  //   .then((response) => response.blob())
  //   .then((blob) => blobToBase64(blob))
  //   .then((base64String) => {
  //     // console.log(base64String,"base64");
  //     setPdfUrl(base64String)
  //     // Use the base64 string as needed
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

    const EditReport = () => {

      const url = "/Report";

      localStorage.setItem("EditReportData", JSON.stringify(reportSetData));
      localStorage.setItem(
        "reportAddedData",
        JSON.stringify(reportSetData.reportaddedData)
      );
      router.push(
        {
          pathname: url,
          query: { data: JSON.stringify(data) },
        },
        url
      );
    };
 const [value, setValue] = useState(1);
 const onChange = (e) => {
   console.log("radio checked", e.target.value);
   setValue(e.target.value);
   setFormateNo(e.target.value);
 
 };
 const handleChange = (value) => {
   console.log(`selected ${value}`);
   setLatterPadNo(value);
    setIslaterPadSelected(true);
 };
    const latterpadSelect=(value)=>{
console.log(value,"value")
setWithLatterPad(value);
 
    }
const GetLatterpadData = async () => {

  // messageAlert("loading", "Geting Client Data...");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const data_obj = {
    userId: UserId,
  };
  await axios
    .get(`${ApiEndPoint}latterpad/`, { params: data_obj })
    .then((response) => {
      console.log("response 7h latter", response);
      if (response.status == 200) {
        //  setClientData(response.data.data);
        if (response.data.data.length === 0) {
          setIsLaterPadCreated(false);
        } else {
          setIsLaterPadCreated(true);
          const x = response.data.data[0];
          localStorage.setItem("LatterPadData",JSON.stringify(x));
          setLatterPadData(x)
          console.log("pdf latter pad data get",x)

        }

        // messageAlert("success", "Succesfully Get all client data");
      } else if (response.status == 201) {
        // setClientData(response.data.data);
        // messageAlert("success", "Data Not Found");
      }
    })
    .catch((error) => {
      // dispatch({
      //   type: ERROR_FINDING_USER
      // })
      console.log(error, "error");
      // messageAlert("error", error.message);
    });
};
useEffect(() => {
  GetLatterpadData();
  const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
  console.log(blobURL,"blobURL")
}, []);


//  const [instance, updateInstance] = usePDF({
//    document: (
//      <MyDocument
//        formateNo={formateNo}
//        setPdfReady={setPdfReady}
//        latterPad={withLatter}
//        islaterPadSelected={islaterPadSelected}
//        latterPadNo={LatterPadNo}
//      />
//    ),
//  });
//  console.log(instance.url, "instance");
const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
const sendReport=async()=>{
  const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
  console.log(blobURL, "blobURL");
  fetch(blobURL)
    .then((response) => response.blob())
    .then((blob) => blobToBase64(blob))
    .then((base64String) => {
      // console.log(base64String,"base64");
      setPdfUrl("data:application/pdf;base64,"+base64String)
      console.log(base64String, "base64String");
      // Use the base64 string as needed
    })
    .catch((error) => {
      console.error(error);
    });

  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // const data = {
  //   pdfurl: pdfurl,
  //   userId: UserId,
  // };
  // axios
  //   .post(ApiEndPoint + "sendreport", data)
  //   .then((response) => {
  //     // Handle the response from the backend
  //     console.log("response",response);
  //     if (response.status == 200) {
  //  alert("send email")
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //     // Handle any errors or unauthorized access
  //   });
}

const docs=[{uri:"data:application/pdf;base64,"+pdfurl}]
const ViewReport=()=>{


  const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
  console.log(blobURL, "blobURL");
  fetch(blobURL)
    .then((response) => response.blob())
    .then((blob) => blobToBase64(blob))
    .then((base64String) => {
      // console.log(base64String,"base64");
      setPdfUrl("data:application/pdf;base64,"+base64String)
      console.log(base64String, "base64String");
      // Use the base64 string as needed
    })
    .catch((error) => {
      console.error(error);
    });
    setOpenViewReport(true)
}

  return (
      <Layout title={"Report-Pdf"}>
        {contextHolder}
        <div className="grid lg:grid-flow-col grid-cols-1 lg:grid-cols-4 w-full gap-3">
          <div className="w-full lg:col-span-3 hidden md:block" id="pdfViewerContainer">
            <PDFViewer width={"100%"} height={600} showToolbar={true}>
              <MyDocument
                formateNo={formateNo}
                setPdfReady={setPdfReady}
                latterPad={withLatter}
                islaterPadSelected={islaterPadSelected}
                latterPadNo={LatterPadNo}
              />
            </PDFViewer>{" "}
     
            {/* {instance.loading ? (
              <h1>Loading pdf...</h1>
            ) : (
              <h1>
                {" "}
                <a href={instance.url} download="test.pdf">
                  Download
                </a>
              </h1>
            )}
            <iframe src={instance.url} width={'100%'} height={600}></iframe> */}
          </div>
          <div className=" w-full mt-[40px] md:mt-[0px] ">
            <div className="flex items-center gap-2 justify-center mb-14">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio className="text-[2rem]" value={1}>
                    Report Fromate 1
                  </Radio>
                  <Radio className="text-[2rem]" value={2}>
                    Report Fromate 2
                  </Radio>
                  <Radio className="text-[2rem]" value={3}>
                    Report Fromate 3
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="flex items-center gap-2 justify-center mb-2">
              <label className="text-[1.6rem] font-inter font-medium">
                {" "}
                With Latter Pad
              </label>
              {isLaterPadCreated ? (
                <Switch onChange={latterpadSelect} size="large" />
              ) : null}{" "}
            </div>
            <div className="mb-5 px-5">
              {isLaterPadCreated ? null : (
                <button
                  onClick={() => router.push(`/Settings?pageId=${3}`)}
                  className="h-[40px] w-full bg-mainDark font-inter text-white border-0 rounded-md cursor-pointer flex items-center justify-center gap-4 text-[1.8rem]"
                >
                  <RiPagesLine />
                  Latter Pad
                </button>
              )}
            </div>

            <div className="mb-5 px-5">
              {withLatter ? (
                <Select
                  // defaultValue="lucy"
                  placeholder="Select Latter Pad Formate"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 1,
                      label: "Formate 1",
                    },
                    {
                      value: 2,
                      label: "Formate 2",
                    },
                    {
                      value: 3,
                      label: "Formate 3",
                    },
                  ]}
                />
              ) : null}
            </div>
            <div className="w-full flex flex-col px-5 gap-8">
            <button
            onClick={ViewReport}
            className="h-[40px]   md:hidden w-full bg-mainDark font-inter text-white border-0 rounded-md cursor-pointer flex items-center justify-center gap-4 text-[1.8rem]"
          >
            <LuView />
            View Report
          </button> 
              <PDFDownloadLink
                className=""
                style={{ textDecoration: "none" }}
                document={
                  <MyDocument
                    formateNo={formateNo}
                    latterPad={withLatter}
                    islaterPadSelected={islaterPadSelected}
                    latterPadNo={LatterPadNo}
                  />
                }
                fileName={fileName}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                   <div >
                   <button className="h-[40px] w-full bg-mainDark font-inter text-white border-0 rounded-md cursor-pointer flex items-center justify-center gap-4 text-[1.8rem]">
                     <MdFileDownload />
                     Donwload
                   </button>
                   <input type="hidden" id="pdfUrl" value={url} />
                   </div>
                   
                  )
                }
              </PDFDownloadLink>

         
              <button
                onClick={sendReport}
                className="h-[40px] hidden w-full bg-mainDark font-inter text-white border-0 rounded-md cursor-pointer  items-center justify-center gap-4 text-[1.8rem]"
              >
                <AiOutlineSend />
                Send
              </button>
              <button
                onClick={EditReport}
                className="h-[40px] w-full bg-mainDark font-inter text-white border-0 rounded-md cursor-pointer flex items-center justify-center gap-4 text-[1.8rem]"
              >
                <FiEdit />
                Edit Report
              </button>
              <button
                onClick={() => showDeleteConfirm()}
                className="h-[40px] w-full border-2 hover:bg-[#dd2c0041] border-[#dd2c00] font-inter text-[#dd2c00] rounded-md cursor-pointer flex items-center justify-center gap-4 text-[1.8rem]"
              >
                <AiOutlineDelete />
                Delete Report
              </button>
            </div>
          </div>
        </div>
   
        <Modal
        className="p-3 relative"
        title={null}
        centered
        open={openViewReport}
        onOk={() => setOpenViewReport(false)}
        onCancel={() => setOpenViewReport(false)}
        width={"98%"}
      >
      <div className=" text-[20px] pl-5 pt-3 cursor-pointer" onClick={()=>setOpenViewReport(false)}>
      <AiOutlineClose/>
      </div>
      <DocViewer
      style={{ width: "100%", height: 500 }}
      documents={[{uri:pdfurl,fileName:fileName}]}
      pluginRenderers={DocViewerRenderers}
    />
      </Modal>
      </Layout>
 
  );
}

export default ReportPdf