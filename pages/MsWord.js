import React from 'react'
import { BlobProvider, Document, Page } from '@react-pdf/renderer'
import Html from 'react-pdf-html';
import pdfHtml from '@/Components/ReportPdf/pdfHtml';
import htmlfile from "../public/dumy.html"
import HtmlFormate2 from '@/Components/ReportPdf/PdfFormates/HtmlFormate2';
import HtmlFormate3 from '@/Components/ReportPdf/PdfFormates/HtmlFormate3';
// Invoke the function to read the HTML file
const Data=[
  {
    srno:1,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:2,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:3,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:4,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:5,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:6,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:7,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:8,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:9,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:10,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:11,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:12,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:13,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:14,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:15,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:16,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:17,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:18,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:19,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:20,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:21,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:22,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:23,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:24,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:25,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  },
  {
    srno:26,
    qty:'23pc',
    size:'5 DEGREE LONG RADIUS 10" X THIK 12.7 ASME B 16.9 BW',
    chemical:{
      Mn:'0.23',
      Ni:'43',
      Cr:'36',
      Co:'0.4',
      Pb:'0.45',
      Nb:'32',
      Mo:'41',
      Fe:'BAL',
    },
    heatno:'45xst',
    remark:'Ok'

  }
]



const MsWord = () => {
  const ReportDataTable=JSON.parse(localStorage.getItem("reportAddedData"))
  const CreatedData=JSON.parse(localStorage.getItem("CreatedData"))

  const htmlStr=HtmlFormate2({'ReportData':ReportDataTable,'CreatedData':CreatedData})
  const MyDoc = () => {

    const htlString=htmlfile

    return (
    <Document>
     {
      htmlStr.map((item)=>{
return  <Page size="A4">
<Html>{htlString}</Html>
</Page>
      })
     }
     
    </Document>
  )
}

  return (
    <div>
      MsWord
      <div>
        <BlobProvider
          document={<MyDoc pageData={Data} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Link href={url != undefined ? url : ""} target="_blank">
                View PDF
              </Link>
            )
          }
        </BlobProvider>
      </div>
    </div>
  );
}

export default MsWord