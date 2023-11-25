
import LatterpadSection from './PdfFormates/LatterpadSection'
import { format } from "date-fns";
const pdfHtml = ({ latterPad, islaterPadSelected, formateNo, latterPadNo }) => {

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
  const Gradedata = ReportCreatedData?.chemical;
  const AlloyContent = (obj) => {
    return `
<div class="alloyContent">
<table>
  <thead>
    <tr>
    ${obj
      .map((item) => {
        return ` <th>${item.Element}</th>`;
      })
      .join("")}
    </tr>
  </thead>
  <tbody>
      <tr>
      ${obj
        .map((item) => {
          return ` <td>${item.percent}</td>`;
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
  padding: 3px;
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
     
       .page-break {
        page-break-before: always;
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
   ${LatterpadSection(latterPadNo, latterPad, islaterPadSelected)}
   </div>
   <div class="topHeading">
    POSITIVE MATERIAL IDENTIFICTION REPORT
   </div>
   <div class="MainInfo">
    <div class="Col_3 heigh_box borderRigth">
    <div class="textfont">PMI REPORT NO:${ReportCreatedData.pmiReportNo?ReportCreatedData.pmiReportNo:''} </div>
    <div class="textfont">Purchase Order:${ReportCreatedData.poNo?ReportCreatedData.poNo:''} </div>
<div class="textfont">Material Specification/Grade:${
      ReportCreatedData.grade
    }</div>
    </div>
    <div class="Col_6 heigh_box borderRigth">
<div class="textfont">Party Name: ${ReportCreatedData.clientName?ReportCreatedData.clientName:''}</div>
<div class="textfont">Testing Agency :${ReportCreatedData.agencyName?ReportCreatedData.agencyName:''}</div>
<div class="textfont">PMI Location: ${ReportCreatedData.location?ReportCreatedData.location:''}</div>
    </div>
    <div class="Col_3 heigh_box LastCol  ">
     <div class="textfont">DATE: ${formatDate(ReportCreatedData.date)}</div>
     <div class="textfont">Page No.: ${indexId + 1}</div>
    </div> 
   <div class="Col_3 heigh_box_2 borderRigth borderTop pd_0">
    <div class="topHeading_2">
Element
    </div>
    <div class="GradeBox">
Specified Goods: ${ReportCreatedData.grade}
    </div>
    </div>
    <div class="Col_6 heigh_box_2 borderRigth borderTop pd_0">
    <div class="topHeading_2">
Alloy Content, Weight Percent
    </div>
   ${AlloyContent(Gradedata)}
    </div>
    <div class="Col_3 heigh_box_2 borderTop LastCol pd_0">
         <div class="topHeading_2">
          Remark
    </div>
    <div class="remark">
      On Reported Element
    </div>
    </div> 
   </div>
${reporttable(indexId)}

   <div class="EndPoinPDF">
<div class="leftDiv">
<div class="TopDiv">
<div class="InstrmentId borderRigth">
<div >Instrument Id: ${ReportCreatedData.InstrumentId?ReportCreatedData.InstrumentId:''}</div>
<div >Models No.: ${ReportCreatedData.ModalNo?ReportCreatedData.ModalNo:''}</div>

</div>
<div class="modalNo">
  <div >Witnessed By:</div>
</div>
</div>
<div class="BottomDiv">
  Notes: 1. The above report The above report relates only to the sample
analyzed.
<br>
2. No part of the report may be alerted, adjusted without the knowledge of
PMI Analytical Services.
</div>
</div>
<div class="rightDiv">
  <div class="Stamptext">
    Operator Signature & Stamp
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

export default pdfHtml