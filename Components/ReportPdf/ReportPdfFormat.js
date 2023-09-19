import { Document, Page, Text, View, StyleSheet,Table, TableCell, TableHeader, TableBody } from '@react-pdf/renderer';

// Create styles
import pdfHtml from './pdfHtml';
import HtmlFormate2 from './PdfFormates/HtmlFormate2';
import HtmlFormate3 from './PdfFormates/HtmlFormate3';
import Html from 'react-pdf-html';
import { useState } from 'react';
// Create Document Component
const MyDocument = ({
  formateNo,
  latterPad,
  islaterPadSelected,
  latterPadNo,
  setPdfReady,
}) => {
  let htmlStr = pdfHtml({
    formateNo: formateNo,
    latterPad: latterPad,
    islaterPadSelected: islaterPadSelected,
    latterPadNo: latterPadNo,
  });

  if (formateNo == 1) {
    htmlStr = pdfHtml({
      formateNo: formateNo,
      latterPad: latterPad,
      islaterPadSelected: islaterPadSelected,
      latterPadNo: latterPadNo,
    });
  } else if (formateNo == 2) {
    htmlStr = HtmlFormate2({
      formateNo: formateNo,
      latterPad: latterPad,
      islaterPadSelected: islaterPadSelected,
      latterPadNo: latterPadNo,
    });
  } else if (formateNo == 3) {
    htmlStr = HtmlFormate3({
      formateNo: formateNo,
      latterPad: latterPad,
      islaterPadSelected: islaterPadSelected,
      latterPadNo: latterPadNo,
    });
  }
  const handleLoadSuccess = () => {
    console.log("pdf ready")
    // Notify the parent component that the PDF is ready
    setPdfReady(true); // Assuming you have a state variable to track readiness
  };
  return (
    <Document onLoadSuccess={()=>handleLoadSuccess()}>
      {htmlStr.map((item) => {
        return (
          <Page size="A4">
            <Html>{item}</Html>
          </Page>
        );
      })}
    </Document>
  );
};
  

export default MyDocument