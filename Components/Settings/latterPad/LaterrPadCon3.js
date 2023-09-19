
import Image from 'next/image'
import css from '../../../styles/LatterPad.module.css'
import React, { useState,useEffect } from 'react'
import img from "../../../public/Images/pmilogo.png"
import ReportlatterPad from './ReportlatterPad';
import {PDFViewer,BlobProvider , PDFDownloadLink } from '@react-pdf/renderer';
import Link from 'next/link';
import LatterPadForm from '@/Components/FormCon/LatterPadForm';
import axios from 'axios';
import { ApiEndPoint } from '@/public/ApiEndPoint';

const LaterrPadCon3 = ({formId}) => {
  const [isLaterPadCreated, setIsLaterPadCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [isLaterPadEdit, setIsLaterPadEdit] = useState(false);
  
       let UserId = "";
       let token;
       if (typeof localStorage != undefined) {
         UserId = localStorage.getItem("UserId");
         token = localStorage.getItem("token");
       }
    var nameColor = formId == 2 ? ' rgb(168, 16, 16)' : '#167FDD'
    var FirstLineColor = formId == 2 ? ' rgb(168, 16, 16)' : '#187EC7'
    const intialvalues = {
        FirstLinetext1: "Shree Ganeshaye namah",
        FirstLinetext2: "Shree Shubhudra Mata namah",
        FirstLinetext3: "Shree BheravNath namah",
        Agencyname: "Agency Name",
        textP: "PMI TESTING SERVICES",
        mobileNo: "9633219478/9367154189",
        officeNo: "022-67496465",
        email: "your_email_id@gmail.com",
        textContent: "Stailness Steel Duplex Steel, Nickel & Titanium, Brass Alloys, Carbon Steel, Alloy Steel Etc",
        address: "your Address, Mumbai - 400 004.",

    }
    const [FormateData, setFormateData] = useState(intialvalues)

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
    setInputvalue({
      ...inputValue,
      text:value
    })
    }
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
const EditLatterPad = () => {
  setIsLaterPadEdit(true);
  setIsLaterPadCreated(false);
};
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

                setImageUrl(x.logo);
                setFormateData({
                  id: x._id,
                  FirstLinetext1: x.text1,
                  FirstLinetext2: x.text2,
                  FirstLinetext3: x.text3,
                  Agencyname: x.agencyName,
                  textP: x.heading,
                  mobileNo: x.mobileNo,
                  officeNo: x.officeNo,
                  email: x.email,
                  textContent: x.description,
                  address: x.address,
                });
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
            messageAlert("error", error.message);
          });
      };
      useEffect(() => {
        GetLatterpadData();
      }, []);
    return (
      <div className={css.LatterpadCon}>
        <div className={css.FormatBox}>
          <div className={`${css.FirstLine} ${css.newtext}`}>
            <p
              style={{ color: FirstLineColor }}
              onClick={() =>
                getTextAndSettext(FormateData.FirstLinetext1, "FirstLinetext1")
              }
            >
              {" "}
              || {FormateData.FirstLinetext1}||
            </p>
            <p
              style={{ color: FirstLineColor }}
              onClick={() =>
                getTextAndSettext(FormateData.FirstLinetext2, "FirstLinetext2")
              }
            >
              || {FormateData.FirstLinetext2}||
            </p>
            <p
              style={{ color: FirstLineColor }}
              onClick={() =>
                getTextAndSettext(FormateData.FirstLinetext3, "FirstLinetext3")
              }
            >
              ||{FormateData.FirstLinetext3} ||
            </p>
          </div>

          <div className="row">
            <div className="col-2">
              <Image src={img} alt="" height={100} width={150} />
            </div>
            <div className="col-10">
              <div className={css.nameBox3}>
                <div className={css.LineBox1}>
                  <div className={css.Line1}></div>
                  <div className={css.Line2}></div>
                </div>
                <h2
                  className={css.changeClass}
                  onClick={() =>
                    getTextAndSettext(FormateData.Agencyname, "Agencyname")
                  }
                >
                  {FormateData.Agencyname}
                </h2>
                <div className={css.LineBox2}>
                  <div className={css.Line1}></div>
                  <div className={css.Line2}></div>
                </div>
              </div>

              <div className={css.bottomtextBox}>
                <div className={css.alloytext}>
                  <h3
                    className={css.changeClass}
                    onClick={() =>
                      getTextAndSettext(FormateData.textContent, "textContent")
                    }
                  >
                    {FormateData.textContent}
                  </h3>
                </div>
                <div className={css.PmiText}>
                  <h1
                    className={css.changeClass}
                    onClick={() =>
                      getTextAndSettext(FormateData.textP, "textP")
                    }
                  >
                    {FormateData.textP}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className={css.endbox}>
            <div className={css.endLine}></div>
            <div className={css.infoBoxCont}>
              <h2>
                EMAIL:
                <span
                  className={css.changeClass}
                  onClick={() => getTextAndSettext(FormateData.email, "email")}
                >
                  {FormateData.email}
                </span>
              </h2>
              <h2>
                MOB:
                <span
                  className={css.changeClass}
                  onClick={() =>
                    getTextAndSettext(FormateData.mobileNo, "mobileNo")
                  }
                >
                  {FormateData.mobileNo}
                </span>
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-5">
          {isLaterPadCreated ? (
            <button
              className="bg-mainDark text-white rounded h-[40px] px-3 font-poppins text-[1.4rem]"
              onClick={() => EditLatterPad()}
            >
              Edit Latter Pad
            </button>
          ) : null}
        </div>
        <div className="mt-3">
          {isLaterPadCreated ? null : (
            <LatterPadForm
              imageUrl={imageUrl}
              loading={loading}
              setTextChange={setTextChange}
              intialvalues={FormateData}
              formateId={formId}
              isLaterPadEdit={isLaterPadEdit}
              setIsLaterPadCreated={setIsLaterPadCreated}
            />
          )}
        </div>
      </div>
    );
}

export default LaterrPadCon3