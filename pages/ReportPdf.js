import React,{useState} from 'react'
import MyDocument from '@/Components/ReportPdf/ReportPdfFormat'
// import { Image } from "antd";
import {PDFViewer,BlobProvider , PDFDownloadLink, renderToBlob,renderToString  } from '@react-pdf/renderer';
import { DownloadOutlined,EyeOutlined } from '@ant-design/icons';
import css from "../styles/ReportPage.module.css"
import formate1 from "../public/Images/ReportFormate/formate1.png"
import formate2 from "../public/Images/ReportFormate/formate2.png";
import formate3 from "../public/Images/ReportFormate/formate3.png";
import Image from 'next/image';
import { Button, Modal,Checkbox  } from "antd";
import Layout from '@/Components/Layout';
import axios from 'axios';
import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'
import { getSession, useSession, signOut } from "next-auth/react"
import { ApiEndPoint } from '@/public/ApiEndPoint';
import Link from 'next/link';
import { useRouter } from 'next/router';
const ReportPdf = () => {
  const router = useRouter();
  const { query } = router;
  var getData = JSON.parse(query.data);
  console.log("getData", getData._doc);
  if(localStorage != undefined){
    localStorage.setItem("ReportCreatedData", JSON.stringify(getData._doc));
  }
  const session = useSession()
const [imagename, setImagename] = useState(formate1);
 const [isModalOpen, setIsModalOpen] = useState(false);
 var currentDate = new Date();
 var formattedDate = currentDate.toISOString().slice(0, 10);
 const reportSetData=JSON.parse(localStorage.getItem('CreatedData'))
//  const dateNew=reportSetData.date== ''?formattedDate.replaceAll("-","_"):reportSetData.date.replaceAll("-","_")
//  const[filename,setFileName]=useState(reportSetData.partyname.replaceAll(" ","_")+"_"+reportSetData.Gradename+"_"+dateNew )
const[withLatter,setWithLatterPad]=useState(false)
const[pdfurl,setPdfUrl]=useState('')
 const handleOk = () => {
   setIsModalOpen(false);
 };
 const handleCancel = () => {
   setIsModalOpen(false);
 };
 const onChangeHandler = (e) => {
  setWithLatterPad(e.target.checked)
  localStorage.setItem('WithLatterPad',e.target.checked)
};
         var data=JSON.parse(localStorage.getItem("ReportAllDAta"))

        // var date=data.date.split("T")[0].replaceAll("-","_")||formattedDate
        // var gradeName=data.Gradename
        const[formateNo,setFormateNo]=useState(1)
        const [email, setEmail] = useState('');
        const [whatsapp, setwhatsapp] = useState('');


  const styles = {
    container: {
      width: '100%',
      height: '100vh',
     
    },
    viewer: {
      width: '100%',
      height: '100%',
      '@media max-width: 420px': {
        maxWidth: '100%',
        maxHeight: '100%',
      },
    },
    downloadbtn:{
      fontSize:"20px",
      background:"#081A51",
      color:"#fff",
      textDecoration:"none",
      padding:"10px",
      borderRadius:"5px"
   
    }
  };
  const FormateSelect=(id)=>{
    setFormateNo(id)
    if(id===2){
      setImagename(formate2)
    }else if(id === 3){
      setImagename(formate3)
    }else{
      setImagename(formate1);
    }
   setIsModalOpen(true);
  }

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
  const blobURL = document.getElementById("pdfUrl")?document.getElementById("pdfUrl").value:"";
  console.log("valueInput", blobURL)
  fetch(blobURL)
    .then((response) => response.blob())
    .then((blob) => blobToBase64(blob))
    .then((base64String) => {
      console.log(base64String,"base64");
      setPdfUrl(base64String)
      // Use the base64 string as needed
    })
    .catch((error) => {
      console.error(error);
    });

  
    

// Create a URL for the Blob object
const pdfUrl = "data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMiAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMzA2MTcwNjM4NTNaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iago0IDAgb2JqCjw8Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAxIDAgUgovTmFtZXMgMiAwIFIKL1ZpZXdlclByZWZlcmVuY2VzIDUgMCBSCj4+CmVuZG9iagoxIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbOCAwIFJdCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9EZXN0cyA8PAogIC9OYW1lcyBbCl0KPj4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0Rpc3BsYXlEb2NUaXRsZSB0cnVlCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9MZW5ndGggNTAzOQovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJztXcmO5LgRvddX5A80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"


    


    

      const SaveReportData=async()=>{
        console.log("data", data, session)
        const clientData = JSON.parse(localStorage.getItem("ClientSelected"))
        try {
          const objData = {
            user_email: session.data.user.email,
            data:{
              client_name:data.partyname,
              client_email: clientData.client_email,
              user_name: data.agencyName,
              chemical_data: data.gradeDataC,
              report_table_data: data.reportAddedData,
              user_location: data.locationName,
              purchase_order: data.poNo,
              created_at :data.date,
              report_id: data.reportNo,
              instrument_data: data.instrumentValue,
              modal_data: data.modalNovalue,
              grade_data: data.Gradename,
            },
            pdf_url: pdfurl
          }
      
          console.log("objec data", objData)

          let resData = await axios.post(`${ApiEndPoint}client_report_info/`, objData)
          console.log(resData,"resData res")
        } catch (error) {
          console.log("error", error)
        }
      }
  return (
    <>
      <Layout title={"Report-Pdf"}>
        <div style={styles.container}>
          <div className="DownloadButton">
            <div className={css.format_row}>
              <div className={`${css.pdfInfo} row`}>
                <div className="col-12 col-md-7">
                  <div className={css.FileName}>
                    <label>File Name</label>
                    <input
                      type="text"
                      className="w-100"
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="Enter File Name..."
                    />
                  </div>
                </div>

                <div className="col-12 col-md-5 d-flex align-items-center justify-content-center mb-3">
                  <Checkbox checked={withLatter} onChange={onChangeHandler}>
                    With LatterPad
                  </Checkbox>
                  ;
                </div>
              </div>

              <div className="row">
                <div className="col-6 col-md-4">
                  <div
                    className={css.formate_box}
                    style={{
                      border: formateNo === 1 ? "4px solid #081A51" : null,
                    }}
                    onClick={() => FormateSelect(1)}
                  >
                    <span className={css.FormateNum}>1</span>
                    <Image
                      src={formate1}
                      alt="formate"
                      className={css.imageFormate}
                    />
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div
                    className={css.formate_box}
                    style={{
                      border: formateNo === 2 ? "4px solid #081A51" : null,
                    }}
                    onClick={() => FormateSelect(2)}
                  >
                    <span className={css.FormateNum}>2</span>
                    <Image
                      src={formate2}
                      alt="formate"
                      className={css.imageFormate}
                    />
                  </div>
                </div>

                <div className="col-6 col-md-4 ">
                  <div
                    className={`${css.formate_box} ${css.formate_three} `}
                    style={{
                      border: formateNo === 3 ? "4px solid #081A51" : null,
                    }}
                    onClick={() => FormateSelect(3)}
                  >
                    <span className={css.FormateNum}>3</span>
                    <Image
                      src={formate3}
                      alt="formate"
                      className={css.imageFormate}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex align-items-center g-5">
              <BlobProvider
                document={
                  <MyDocument formateNo={formateNo} latterPad={withLatter} />
                }
                style={styles.viewer}
                filename="example.pdf"
              >
                {({ url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : error ? (
                    "Error loading document :("
                  ) : (
                    <>
                      <Link
                        href={url != undefined ? url : ""}
                        className="btnBox mx-3"
                        target="_blank"
                      >
                        View PDF
                        <EyeOutlined />{" "}
                      </Link>
                      <input type="hidden" value={url} id="pdfUrl" />
                    </>
                  )
                }
              </BlobProvider>

              <PDFDownloadLink
                className="btnBox"
                document={<MyDocument formateNo={formateNo} />}
                // fileName={filename}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <>
                      <span onClick={() => SaveReportData()}>
                        Download PDF <DownloadOutlined />
                      </span>
                    </>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
          <button onClick={() => SaveReportData()}>Save Data</button>
        </div>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Image src={imagename} alt="formate" className={css.imageFormate} />
        </Modal>
      </Layout>
    </>
  );
}

export default ReportPdf