import css from '../../../styles/LatterPad.module.css'
import React,{useEffect, useState} from 'react'
import { PlusOutlined,LoadingOutlined  } from '@ant-design/icons';
import { Form, Input, Upload, message } from 'antd'
import ReportlatterPad from './ReportlatterPad';
import {PDFViewer,BlobProvider , PDFDownloadLink } from '@react-pdf/renderer';
import Link from 'next/link';
import LatterPadForm from '@/Components/FormCon/LatterPadForm';
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
const LaterrPadCon = ({formId}) => {


       let UserId = "";
       let token;
       if (typeof localStorage != undefined) {
         UserId = localStorage.getItem("UserId");
         token = localStorage.getItem("token");
       }
    var nameColor=formId==2?' rgb(168, 16, 16)':'#167FDD'
  var FirstLineColor=formId==2?' rgb(168, 16, 16)':'#187EC7'
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const[fileObj,setFileObj]=useState()
  const [isLaterPadCreated, setIsLaterPadCreated] = useState(false);
  const [isLaterPadEdit, setIsLaterPadEdit] = useState(false);

const intialvalues={
  FirstLinetext1:"Shree Ganeshaye namah",
  FirstLinetext2:"Shree Shubhudra Mata namah",
  FirstLinetext3:"Shree BheravNath namah",
  Agencyname:"Agency Name",
  textP:"PMI TESTING SERVICES",
  mobileNo:"9633219478/9367154189",
  officeNo:"022-67496465",
  email:"your_email_id@gmail.com",
  textContent:"Stailness Steel Duplex Steel, Nickel & Titanium, Brass Alloys, Carbon Steel, Alloy Steel Etc",
  address:"your Address, Mumbai - 400 004.",
 
}
  const[FormateData,setFormateData]=useState(intialvalues)
  const[inputValue,setInputvalue]=useState({name:"",
text:""})
const getTextAndSettext=(text,name)=>{
  setInputvalue({
    text,name
  })
}
const setTextChange=(e)=>{
  const {name,value}=e.target
            setFormateData({
              ...FormateData,
              [name]:value
            })
            // setInputvalue({
            //   ...inputValue,
            //   text:value
            // })
            console.log(name,value,"name,value")
}

  const handleChange = (info) => {
    setFileObj(info)
        getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem("base64Img",url)
      });

  };
  const GetLatterpadData=async()=>{

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
          if(response.data.data.length === 0){
            setIsLaterPadCreated(false)
          }else{
            setIsLaterPadCreated(true)
            const x=response.data.data[0]

            setImageUrl(x.logo)
            setFormateData(
              {
                id:x._id,
                FirstLinetext1:x.text1,
                FirstLinetext2:x.text2,
                FirstLinetext3:x.text3,
                Agencyname:x.agencyName,
                textP:x.heading,
                mobileNo:x.mobileNo,
                officeNo:x.officeNo,
                email:x.email,
                textContent:x.description,
                address:x.address,
              }
            )
          }
       
          // messageAlert("success", "Succesfully Get all client data");
        }else if (response.status == 201) {
              // setClientData(response.data.data);
              // messageAlert("success", "Data Not Found");
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
    GetLatterpadData()
  }, [])
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
  const SaveLaterPadData=()=>{


localStorage.setItem('LatterPadData',JSON.stringify(FormateData))
localStorage.setItem('FormateNO',formId)

  }
const EditLatterPad=()=>{
  setIsLaterPadEdit(true)
  setIsLaterPadCreated(false)
}
  return (
   <>
   <div className={css.LatterpadCon}>
        <div className={css.FormatBox}>
            <div className={css.FirstLine}>
              <p style={{color:FirstLineColor}} > || {FormateData.FirstLinetext1}||</p>
              <p style={{color:FirstLineColor}}  >|| {FormateData.FirstLinetext2}||</p>
              <p style={{color:FirstLineColor}} >||{FormateData.FirstLinetext3} ||</p>
              </div>
<div className={css.nameLogo}>
  <div className={css.logoBox}>
  <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
   <p>Your logo</p>
  </div>
  <div className={css.textname}>
    <h2 style={{color:nameColor}} >{FormateData.Agencyname}</h2>
    <h4 >{FormateData.textP}
</h4>
  </div>
  <div className={css.infoCon}>
    <h4 >Office: {FormateData.officeNo}</h4>
    <h4 >Mob: {FormateData.mobileNo} </h4>

    <h4 >Email:{FormateData.email}
</h4>

  </div>
</div>
{
formId==2?null:
<div className={css.textContent}>
  <h5 onClick={()=>getTextAndSettext(FormateData.textContent,'textContent')}>{FormateData.textContent}</h5>
</div>}

<div className={ formId == 2?`${css.AddressCon} ${css.FormChangeClass}`:`${css.AddressCon}`} >
{FormateData.address}
</div>
        </div>
<div className='flex items-center justify-center mt-5'>
{
  isLaterPadCreated?<button
  className="bg-mainDark text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
  onClick={()=>EditLatterPad()}
>
  Edit Latter Pad
</button>:null
}

</div>
<div className="mt-3">
{
  isLaterPadCreated?null:<LatterPadForm imageUrl={imageUrl}  loading={loading} handleChange={handleChange} beforeUpload={beforeUpload} setTextChange={setTextChange} intialvalues={FormateData} formateId={formId} isLaterPadEdit={isLaterPadEdit} setIsLaterPadCreated={setIsLaterPadCreated}/>
}

</div>










       {/* <div className={css.SetInputField}>

          <input type='text' value={inputValue.text} name={inputValue.name} onChange={setTextChange}/>
          <button onClick={()=>SaveLaterPadData()}>Save</button>
    </div>*/}
       {/* <BlobProvider
                document={<ReportlatterPad  />}
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


                    <Link href={url != undefined?url:""}  className="btnBox mx-3" target="_blank">
                      View PDF
                    </Link>
                    </>
                  )
                }
              </BlobProvider>
            */}
        </div>  
   </>
  )
}

export default LaterrPadCon