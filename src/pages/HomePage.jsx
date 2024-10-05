import React, { useEffect } from "react";
import SectionWithImage from "../components/SectionWithImage";
import content from "../assets/content/home.json"
import Cookies from 'universal-cookie';
import { useState } from "react";
import "../styles/HomePage.css"
import ReactGA from "react-ga4";
 /*---------------------data generator functions for resuable componenets-------------------- 
 Note: all generator functions starts with get */


function getSectionWithImageFirst(){
  const firstSection = content.homePage.SectionWithImageFirst
  // modifications in content 
  const heading = (
    <>
      {firstSection.headingInBlack}
      <span className="text-primary"> {firstSection.headingInBlue} </span>
    </>
  );
  const paragraph = (
    <>
     {firstSection.paragraph.beforeBreakPoint}
     <br/> <br/>
     {firstSection.paragraph.afterBreakPoint}
    </>
  );
  const buttons = [
    { text: firstSection.button1.text, href: firstSection.button1.redirection },
    { text: firstSection.button2.text, href: firstSection.button2.redirection },
  ];
  const data = {
    "imageSrc":firstSection.imageSrc,
    "imageAlt":firstSection.imageAlt,
    "heading":heading,
    "paragraph": paragraph,
    "buttons":buttons,
    "imageOnLeft":firstSection.imageOnLeft


  }
  return data
}
// -----------------------specific componenets to homepage ----------------
// function Services(){
//   return (
//     <h1>Here are your services </h1>
//   )
// }
// ---------------------main home componenet ------------------------
function HomePage() {
  useEffect(()=>{
    ReactGA.send({page:window.location.href,title:"Home page"});
  },[])
  const cookies = new Cookies(); 
  const [userCred] = useState(cookies.get("userCred"));
  const [ids] = useState(cookies.get("ids"));
  const[userData,setUserData] = useState(null);
    function auth(){
      fetch(`https://api.zerotwo.in/auth/${userCred.username}/${userCred.password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "id": ids.id,
        "device":ids.device

      },
    })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          setUserData(data);
      })
      .catch((error) => {
        // Handle any errors
      });}
    // if user loged in then fetch his data 
    if(userCred && ids){
      auth()
    }else{
          //nothing
    }
  // )
  // generating data for reusable components 
  const FirstSecImgData =  getSectionWithImageFirst()
  return (
    <div className="home-div">
      {userCred && (
        <>
          <h1 className="user-name | text-center " >Welcome : {userCred.username.split("@")[0]}</h1>
        </>
      )}
      <section className="pt-2 pb-5">
      <SectionWithImage
        imageSrc={FirstSecImgData.imageSrc}
        imageAlt={FirstSecImgData.imageAlt}
        heading={FirstSecImgData.heading}
        paragraph={FirstSecImgData.paragraph}
        buttons={FirstSecImgData.buttons}
        imageOnLeft={FirstSecImgData.imageOnLeft}
      />
      {/* <Services /> */}
      </section>
    </div>
    
  );
}

export default HomePage;
