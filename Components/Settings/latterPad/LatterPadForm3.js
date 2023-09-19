import React from 'react'

const LatterPadForm3 = () => {
  
    const latterpad1=()=>{
        const LaterPadData=JSON.parse(localStorage.getItem('LatterPadData'))||{}
        const Img="data:image/png;base64,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"
        const htmlStr = `
        <style>
        .textFirst{
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          padding: 3px;
        }
        .textLater{
          font-size: 10px;
          color:#E44433;
        }
        .nameLogo{
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          margin-top: 10px;
          padding-left: 5px;
          padding-right: 5px;
        }
        .Contact_info .Contact_text{
          font-size: 11px;
          padding: 0px;
        }
        .nametext{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .AgencyName {
      font-size: 30px;
      color:  #8F212A;
      font-weight: bold;
        }
        .Nametext{
          font-size: 23px;
          margin-top: 5px;
        }
        .pd_b{
          padding-bottom: 3px;
        }
        .pmitext{
          font-size: 14px;
          text-align: center;
          margin-top: 7px;
          border-bottom: 1px solid #0c7eac;
          padding: 2px 5px;
      margin-left: 5px;
      margin-right: 5px;
        }
        .addresstext{
            font-size: 13px;
            text-align: center;
    margin-top: 5px;
    background-color: #8F212A;
    color: #fff;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
          }
        .logoImg{
          width: 90px;
          height: 80px;
          object-fit: fill;
        }
        .Logobox{
          width:110px;
          display: flex;
          justify-content: center;
          align-items: center;
      
        }
        .nameBox3{
          width: 100%;
         display: flex;
         align-items: center;
         flex-direction: row;
      }
      .LineBox1{
         flex: 1;
         width: 300px;
      }
   .textagencynew{
       width:250px;
      color: #D7564A;
      text-align: center;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 0 10px;
      white-space:nowrap;
      }
      .LineBox2{
          width: 100px;
      }
      .LineBox1,.LineBox2{
      display: flex;
      flex-direction: column;
      gap: 7px;
      }
      .LineBox1 .Line1{
        width:200px;
      }
      .LineBox1 .Line2{
        width:200px;
      }
      .LineBox2 .Line1{
        width:30px;
      }
      .LineBox2 .Line2{
        width:30px;
      }
      .Line1{
          height: 15px;
          background-color: #D04F3C;
      }
      .Line2{
          height: 15px;
          background-color: #49476C;
      }
      .bottomtextBox{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        margin-top:10px;
    }
    .alloytext{
      width:200px;
    color: #444368;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: normal;
    }
    .PmiText{
      width:220px;
      background-color: #49476C;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin: 0px;
      }
        .text_info{
          color: #D04F3C;
          text-align: left;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
      
        }
        .endLine{
          width:60%;
          padding-left:10px;
    height: 1.5px;
    background: #D04F3C;
    margin-left:10px;
        }
        .endbox{
          display: flex;
          flex-direction:row;
          align-items: center;
          margin-top:4px;
        }

        .infoBoxCont{
          margin-left:10px;
        }
        </style>
        <div class="textFirst">
        <div class="textLater">|| ${LaterPadData.text1} ||</div>
        <div class="textLater">|| ${LaterPadData.text2} ||</div>
        <div class="textLater">|| ${LaterPadData.text3} ||</div>
        </div>
        <div class="nameLogo">
          <div class="Logobox">
            <img class="logoImg" src=${Img} alt="logo"/>
          </div>

          <div class="">
          <div class="nameBox3">
          <div class="LineBox1">
          <div class="Line1"> </div> 
          <div class="Line2">
          </div> 
          </div> 
          <div class="textagencynew">${LaterPadData.agencyName}</div>  
          <div class="LineBox2">
          <div class="Line1"> </div> 
          <div class="Line2">
          </div> 
          </div>  
          </div>
          <div class="bottomtextBox">
          <div class="alloytext">
          ${LaterPadData.description}
          </div>
          <div class="PmiText">  ${LaterPadData.heading}</div>
          </div>
          </div>
        </div>
        <div class="endbox">
        <div class="endLine"></div>
        <div class="infoBoxCont">
        <div class="text_info">
        Email:${LaterPadData.email}
        </div>
        <div class="text_info">
        Mob: ${LaterPadData.mobileNo}
        </div>
        </div>
        </div>

        
                   
        `;
      return htmlStr
      }
  return latterpad1()
}

export default LatterPadForm3