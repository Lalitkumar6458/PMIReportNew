import React from 'react'
import LatterPadForm1 from '@/Components/Settings/latterPad/LatterPadForm1'
import LatterpadSection from './LatterpadSection'
import { format } from "date-fns";
const HtmlFormate2 = ({
  latterPad,
  islaterPadSelected,
  formateNo,
  latterPadNo,
}) => {
  const LaterPad_Id = localStorage.getItem("FormateNO");
  const ReportCreatedData = JSON.parse(
    localStorage.getItem("ReportCreatedData")
  );

  const Data = ReportCreatedData["reportaddedData"].map((item) => {
    const obj = {};

    Object.keys(item).map((each) => {
      if (
        each == "srno" ||
        each == "size" ||
        each == "heatno" ||
        each == "remark" ||
        each == "qty"
      ) {
        obj[each] = item[each];
      } else if (each == "key") {
      } else {
        obj["chemical"] = {
          ...obj["chemical"],
          [each]: item[each],
        };
      }
    });
    return obj;
  });

  const ceilingValue = Math.ceil(Data.length / 14);
  function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  function reporttable(index_id) {
    let tableList = "";
    const listData = chunkArray(Data, 14)[index_id];
    tableList = `<div class="Sizetable">
  <div class="headertable">
    <div  class="srNo ">Sr No.</div>
    <div  class="qty_size">QTY</div>
    <div  class="SizeCol">Size(Descriptions)</div>
    ${Object.keys(listData[0]?.chemical)
      .map((item, index) => {
        return `<div class="chemic_c" key=${index}>${item}</div>`;
      })
      .join("")}
    ${"heatno" in listData[0] ? `<div class="heatNo">Heat NO</div>` : ``}
    
    <div class="remark_col">Reamrk</div>
  </div>
  ${listData
    .map((item, index) => {
      if (index + 1 < 16) {
        return `
        <div class="TableRow" >
          <div class="srNo">${item.srno}</div>
          <div  class="qty_size">${item.qty}</div>
          <div class="SizeCol">${item.size}</div>
        
          ${Object.keys(item.chemical)
            .map((each) => {
              return `
          <div class="chemic_c">${item.chemical[each]}</div>
              `;
            })
            .join("")}
          ${
            "heatno" in listData[0]
              ? `<div class="heatNo">${item.heatno}</div>`
              : ``
          }
         
          
          <div class="remark_col">${item.remark}</div>
        </div>
        `;
      }
    })
    .join("")}

  </div>`;

    return tableList;
  }

  const AlloyContent = (obj) => {
    return `
<div class="alloyContent">
<table>
  <thead>
    <tr>
    ${Object.keys(obj)
      .map((item) => {
        return ` <th>${item}</th>`;
      })
      .join("")}
    </tr>
  </thead>
  <tbody>
      <tr>
      ${Object.keys(obj)
        .map((item) => {
          return ` <td>${obj[item]}</td>`;
        })
        .join("")}
    </tr>
  </tbody>
</table>
</div>`;
  };

  function styleFun(DataLen) {
    const lenData = Object.keys(DataLen.chemical).length;
    let sizeWidth = "30%";
    if (lenData == 4) {
      sizeWidth = "heatno" in DataLen ? "50%" : "60%";
    } else if (lenData == 5) {
      sizeWidth = "heatno" in DataLen ? "45%" : "55%";
    } else if (lenData == 6) {
      sizeWidth = "heatno" in DataLen ? "40%" : "50%";
    } else if (lenData == 7) {
      sizeWidth = "heatno" in DataLen ? "35%" : "45%";
    } else if (lenData == 8) {
      sizeWidth = "heatno" in DataLen ? "30%" : "40%";
    } else if (lenData == 9) {
      sizeWidth = "heatno" in DataLen ? "30%" : "40%";
    } else if (lenData == 10) {
      sizeWidth = "heatno" in DataLen ? "25%" : "35%";
    }

    const styleSheet = `
  <style>
  .mainDiv{
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }
  .Topheader{
    height: 140px;
    width: 100%;
    border-bottom: 1px solid #000;
  }
  .topHeading{
    border-bottom: 1px solid #000;
    display: flex;
    align-items: center;
  font-size: 12px;
    justify-content: center;
    padding: 2px;
  }
  .topHeading h4{
  font-size: 12px;
  text-align: center;
  }
  .MainInfo{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #000;
    width: 100%;
    flex-direction: row;
  }
  .Col_3{
  
         display: flex;
  flex-direction: column;
  width: 35%;
  gap: 5px;
  padding: 3px;
  }
  .Col_6{
    width: 40%;
          display: flex;
          flex-direction: column;
          }
          .Col_7{
            width: 60%;
          display: flex;
          flex-direction: column;
          }
  .borderRigth{
    border-right: 1px solid #000;
  }
  .heigh_box{
    height: 80px;
  }
  .heigh_box_2{
    height: 60px;
  }
  .borderTop{
    border-top: 1px solid #000;
  }
  .textfont{
    font-size: 12px;
    padding-left:5px;
    display: flex;
    align-items: flex-start;
    justify-content: center;

  }
  .LastCol{
    width: 20%;
  }
  .topHeading_2{
    border-bottom: 1px solid #000;
    font-size: 12px;
    text-align: center;
    height: 30%;
          display: flex;
    align-items: center;
    justify-content: center;
  }
  .pd_0{
    padding: 0px;
  }
  .GradeBox,.remark{
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
   .alloyContent{
    display: flex;
    align-items: center;
    justify-content: center;
      height: 70%;
   }
  .alloyContent table{
    width: 100%;
  border: 1px solid #000;
  border-right: none;
  }
  
    .alloyContent td{
    border-bottom: none;
  }
  .alloyContent td,th{
    font-size: 10px;
    text-align: center;
  }
  
  .alloyContent td:first-child,   .alloyContent th:first-child{
  border-left: none;
  
  }
     .alloyContent td:last-child, .alloyContent th:last-child{
  border-right: none;
     }
     .Sizetable{
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
     }
     .Sizetable .headertable{
      display: flex;
      flex-direction: row;
      font-size: 10px;
  border-bottom: 1px solid #000;
  font-weight: bold;
     }
     .headertable div{
      text-transform: capitalize;
     }
     .headertable div,.Sizetable .TableRow div {
      border-right: 1px solid #000;
      display: flex;
    align-items: center;
    justify-content: center;

  
     }
     .headertable div:last-child,.Sizetable .TableRow div:last-child {
      border-right: none;
     }
     .Sizetable .TableRow{
      display: flex;
      flex-direction: row;
      font-size: 9px;
      border-bottom: 1px solid #000;
     }
     .Sizetable .TableRow:last-child{
      border-bottom:none;
     }
       .srNo{
        width: 5%;
  
       }
       .qty_size{
        width: 5%;
       }
       .SizeCol{
        width: ${sizeWidth};
        padding: 2px;
       }
       .chemic_c{
        width: 5%;
        text-transform: capitalize;
       }
       .heatNo,.remark_col{
        width: 10%;
       }
       .EndPoinPDF{
        border-top: 1px solid #000;
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: center;
        flex-direction: row;
       }
       .leftDiv{
        width: 70%;
        height: 100%;
        border-right: 1px solid #000;
       }
       .rightDiv{
        width: 30%;
        height: 100%;
        font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
       }
       .TopDiv{
        display: flex;
        align-items: center;
        flex-direction: row;
       }
       
       .InstrmentId,.modalNo{
        width: 50%;
        height: 50px;
        border-bottom: 1px solid #000;
        font-size: 13px;
        padding: 5px;
  
       }
       .BottomDiv{
        font-size: 12px;
        padding: 5px;
       }
       .testReport_text{
        border-bottom: 1px solid #000;
        display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                  font-weight: bold;
      }
      .borderBottom{
              border-bottom: 1px solid #000;
            }
            .heigth_25{
              height: 25%;
            }
            .marTop{
              margin-top: 5px;
            }
            .Col_3End{
              width: 33%;
              height: 100%;
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              justify-content: space-between;
              padding: 10px 5px;
            }
            .nedtext{
              font-size: 10px;
            }
            .fontSize{
              font-size: 10px;
      
            }
     
  </style>
  `;
    return styleSheet;
  }
  const formatDate = (dateString) => {
    // Adjust the format string as per your desired date format
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  function getHtml(indexId) {
    const StrinHtml = `
<html>
  <body>
   ${styleFun(Data[0])}
   <div class="mainDiv">
   <div class="Topheader">
   ${LatterpadSection(latterPadNo,latterPad, islaterPadSelected)}
   </div>
   <div class="testReport_text">
   TEST REPORT
  </div>
  <div class="topHeading">
   POSITIVE MATERIAL IDENTIFICTION REPORT
  </div>
  <div class="MainInfo">
   <div class="Col_6 heigh_box borderRigth">
   <div class="textfont borderBottom heigth_25">PMI REPORT NO:-${
     ReportCreatedData.pmiReportNo
   } </div>
   <div class="textfont borderBottom heigth_25">Date : ${formatDate(
     ReportCreatedData.date
   )}</div>
<div class="textfont marTop">Specified Grade: ${ReportCreatedData.grade}</div>
   </div>
   <div class="Col_7 heigh_box ">
<div class="textfont borderBottom heigth_25">M/S :-  ${
      ReportCreatedData.clientName
    }</div>
<div class="textfont borderBottom heigth_25">Location: ${
      ReportCreatedData.location
    }</div>
<div class="textfont borderBottom heigth_25">PO NO:- ${
      ReportCreatedData.poNo
    }</div>
<div class="textfont heigth_25">CLIENT NAME:-</div>

   </div>
     
   </div>
 
${reporttable(indexId)}

<div class="EndPoinPDF">
<div class="Col_3End borderRigth">
<div class="nedtext">
  INSTRUMENT TYPE/ID:- ${ReportCreatedData.InstrumentId}
</div>
<div class="nedtext">
  X-XRF ANALYER: OXFORD MODEL 
</div>
<div class="nedtext">
  MODEL NO:${ReportCreatedData.ModalNo}
</div>
<div class="nedtext">
  SR.NO.:-
</div>
</div>
<div class="Col_3End borderRigth">
  <div class="nedtext">
    WITNESSED BY:
  </div>
  <div class="nedtext">
    INSPECTION AGENCY:
  </div>
</div>
<div class="Col_3End">
  <div class="nedtext fontSize">
    POOJA PMIHH TESTING SERVICEST
  </div>
  <div class="nedtext">
    Authorised sign
  </div>
</div>
   </div>
   </div>
  </body>
</html>

`;
    return StrinHtml;
  }

  const DataList = [];

  for (let i = 1; i <= ceilingValue; i++) {
    DataList.push(getHtml(i - 1));
  }

  return DataList;
};

export default HtmlFormate2