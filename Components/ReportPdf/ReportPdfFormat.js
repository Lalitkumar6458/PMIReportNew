import { Document, Page, Text, View, StyleSheet,Table, TableCell, TableHeader, TableBody } from '@react-pdf/renderer';

// Create styles
import pdfHtml from './pdfHtml';
import HtmlFormate2 from './PdfFormates/HtmlFormate2';
import HtmlFormate3 from './PdfFormates/HtmlFormate3';
import Html from 'react-pdf-html';
// Create Document Component
const MyDocument = ({formateNo,latterPad}) => {
 


const ReportDataTable=JSON.parse(localStorage.getItem("reportAddedData"))
const CreatedData=JSON.parse(localStorage.getItem("CreatedData"))
const GetSavePdfData=JSON.parse(localStorage.getItem("ReportCreatedData"))

let htmlStr=pdfHtml({'latterPad':latterPad})

if(formateNo == 1){
 htmlStr=pdfHtml({'ReportData':ReportDataTable,'CreatedData':CreatedData,'latterPad':latterPad})

}else if(formateNo == 2){
  htmlStr=HtmlFormate2({'ReportData':ReportDataTable,'CreatedData':CreatedData,'latterPad':latterPad})
}else if(formateNo == 3){
  htmlStr=HtmlFormate3({'ReportData':ReportDataTable,'CreatedData':CreatedData,'latterPad':latterPad})

}
  return(

    <Document>
    {
     htmlStr.map((item)=>{
return  <Page size="A4">
<Html>{item}</Html>
</Page>
     })
    }
    
   </Document>

  )
}
  

export default MyDocument