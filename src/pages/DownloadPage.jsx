import { useState ,useEffect,useRef} from "react";
import clipboardCopy from 'clipboard-copy';
import {  useParams } from "react-router-dom";
import MyButton from "../components/MyButton"
import Disclaimer from "../components/Disclaimer";

// external libs 
import ReCAPTCHA from 'react-google-recaptcha';
import { NotificationManager} from 'react-notifications';
import ReactLoading from 'react-loading';
// styles 
import "../styles/DownloadPage.css";
// utility functions 
export const handleCopy = (text) => {
    clipboardCopy(text)
      .then(() => {
        alert('Link copied successfully');
      })
      .catch((error) => {
        alert('Failed to copy link');
      });
  };

function DownloadContainer({name,size,link,captchaRef,formHandler}){
  return (
    <section className="download-container | transparent-container flex-col">
      <div>
        <h1>{name}</h1>
      </div>
      <small>
        {size}
      </small>
        <form id="download-start" onSubmit={formHandler}>
          <input  type="hidden" name="endPoint" value={link} />
          <div className="download-btns">
              <ReCAPTCHA ref = {captchaRef} sitekey="6Ld7Y4omAAAAAKhWv9p6tsp8-X_cA02FVADpR5JZ"/>
              <div className="flex gap-100">
                <button form= "download-start" className="btn"  type="submit">Download</button>
                <MyButton text={"Share"} icon={"share"}  onClick={()=>handleCopy(window.location.href)}/>
              </div>
          </div>
        </form>
    </section>
  )
}

function DownloadPage() {
    const { id, fileid, filename } = useParams();
    const [data, setData] = useState(null);
    const captchaRef = useRef(null)
    const handleSubmit = (e) =>{
        e.preventDefault();
        const token = captchaRef.current.getValue();
        if(token === ''){
          NotificationManager.error('Captcha not filled',"Error", 5000);
          return;
        }else{
          let url = `${e.target.endPoint.value}/${token}`
          captchaRef.current.reset();
          // ---------making a download request ---------
          window.open(url, "_blank"); 
        }
    } 
    useEffect(() => {
      const apiUrl = `https://api.zerotwo.in/info`;
      let headers = {
        "id": id,
        "fileid": fileid,
      };
      if(filename){
        headers = {
          "id": id,
          "fileid": fileid,
          "filename":filename
        };
      }
      fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            data.status? setData(data.data):NotificationManager.error("Link has been expired","Error",5000);
        })
        .catch(error => {
          NotificationManager.error("Unable to communicate with server","Error",5000)
        });
    }, [id, fileid, filename]);
    return (
        <div>
        {data?(
          <>  
          {data.map((element)=>(
              <DownloadContainer 
              name = {element.file_name}
              size = {element.file_size}
              link = {element.link}
              captchaRef={captchaRef}
              formHandler = {handleSubmit}
              />
          ))}
          </>
        ):(
          <>
          <ReactLoading type="spin" color="var(--clr-primary-400)" className="download-page-spinner" />
          </>
        )}
        <Disclaimer />
        </div>
    );
}
export default DownloadPage;