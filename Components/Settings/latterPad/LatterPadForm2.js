import React from 'react'

const LatterPadForm2 = () => {
  
    const latterpad1=()=>{
        const LaterPadData=JSON.parse(localStorage.getItem('LatterPadData'))||{}
        const Img=localStorage.getItem('base64Img')
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
          color:  #8F212A;
        }
        .nameLogo{
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          margin-top: 5px;
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
          width: 80px;
          height: 60px;
          object-fit: fill;
        }
        .Logobox{
          width:110px;
          display: flex;
          justify-content: center;
          align-items: center;
      
        }
        
        </style>
        <div class="textFirst">
        <div class="textLater">|| ${LaterPadData.text1} ||</div>
        <div class="textLater">|| ${LaterPadData.text2} ||</div>
        <div class="textLater">|| ${LaterPadData.text3} ||</div>
        </div>
        <div class="nameLogo">
          <div class="Logobox">
            <img class="logoImg" src=${LaterPadData?.logo} alt="logo"/>
          </div>
          <div class="nametext">
      <div class="AgencyName">
      ${LaterPadData.agencyName}
      </div>
      <div class="Nametext">
      ${LaterPadData.heading}
      </div>
          </div>
          <div class="Contact_info">
      <div class="Contact_text pd_b">Office: ${LaterPadData.officeNo}</div>
      <div class="Contact_text pd_b">Mob: ${LaterPadData.mobileNo}</div>
      
      <div class="Contact_text">Email:${LaterPadData.email}</div>
      
          </div>
        </div>
        <div class="addresstext">
          ${LaterPadData.address}
        </div>
        
                   
        `;
      return htmlStr
      }
  return latterpad1()
}

export default LatterPadForm2