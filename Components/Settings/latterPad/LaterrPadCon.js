import css from '../../../styles/LatterPad.module.css'
import React,{useState} from 'react'
import { PlusOutlined,LoadingOutlined  } from '@ant-design/icons';
import { Form, Input, Upload, message } from 'antd'
import ReportlatterPad from './ReportlatterPad';
import {PDFViewer,BlobProvider , PDFDownloadLink } from '@react-pdf/renderer';
import Link from 'next/link';
import LatterPadForm from '@/Components/FormCon/LatterPadForm';

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


<div className="mt-3">
<LatterPadForm imageUrl={imageUrl} loading={loading} handleChange={handleChange} beforeUpload={beforeUpload} setTextChange={setTextChange} intialvalues={intialvalues}/>
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