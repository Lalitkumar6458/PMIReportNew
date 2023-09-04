import React from 'react'
import { Document, Page, Text, View, StyleSheet,Table, TableCell, TableHeader, TableBody } from '@react-pdf/renderer';
import TopLatterPad from './TopLatterPad';
import LatterPadForm3 from './LatterPadForm3';
import Html from 'react-pdf-html';
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding:"10px 10px",
      width:"100%",
      position:"relative"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    section_main:{
      border:"1px solid #000",
      width:"100%",
      height:"95vh"
    },
    blank_space:{
      height:"150px",
      width:"100%",
      // border:"1px solid #000",
  
    },
    heading_box:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:"10px",
      padding:"2px",
      borderStyle: "solid",
      borderColor:"#000",
      borderWidth: 1,
      borderLeft:0,
      borderRight:0,
    },
    detailsBox:{
      display:"flex",
      flexDirection:"row",
      fontSize:"11px",
      width:"100%"
    },
    col_4:{
  border:"1px solid #000",
  height:"70px",
  flexGrow: 1,
  padding:"5px",
  display:"flex",
  gap:"5px"
  
    },
    testHeading:{
      width:"100%",
      textAlign:"center",
      fontSize:13,
      borderTopWidth:1,
      borderColor:"#000",
      borderStyle:"solid"
    }
  
  });
  
  StyleSheet.create({
    '@global': {
      body: {
        fontFamily: 'Arial',
      },
    },
  });
  


const ReportlatterPad = () => {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section_main}>
<View style={styles.blank_space}>

<Html>
{LatterPadForm3()}
</Html>
</View>
<View style={styles.testHeading}><Text>TEST REPORT</Text></View>




      </View>
    </Page>
  </Document>
  )
}

export default ReportlatterPad