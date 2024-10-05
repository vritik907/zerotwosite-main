import "../styles/UploadPage.css"
import {useState,useRef} from "react"
import MyButton from "../components/MyButton"
import { handleCopy } from "./DownloadPage";
// external libs 
import ReCAPTCHA from 'react-google-recaptcha';
import {NotificationManager}  from "react-notifications"
import ReactLoading from 'react-loading';
import { filesize } from "filesize";
function UploadFile() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadProgress,setUploadProgress] = useState(null);
  const captchaRef = useRef(null)
  
  const handleUploadProgress = (event) => {
    if (event.lengthComputable && event.loaded !== event.total) {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(progress);
    }else{
      //
    }

  };

  const handleUploadComplete = (event) => {
    // resetting states 
    setUploadStarted(false)
    if (event.target.readyState === 4) {
      if (event.target.status === 200) {
        const data = JSON.parse(event.target.responseText);
        if (data.status === false) {
          NotificationManager.error("Unable to upload.", "Error", 5000);
        } else {
          setUploadedUrl(data.url);
          NotificationManager.success("Uploaded Successfully", "Success", 5000);
          NotificationManager.info("Copy & share link any where you want", "Feel free to ", 10000);
        }
      } else {
        NotificationManager.error("Internet connection error.", "Error", 5000);
      }
    }
  };
  const uploadToServer = () =>{
    const token = captchaRef.current.getValue();
    if (!uploadedFile) {
      NotificationManager.error('File not selected',"Error", 5000);
      return; 
    }else if(token === "" || token === null){
      NotificationManager.error('Captcha not filled',"Error", 5000);
      return
    }
    const url = `https://api.zerotwo.in/1068352349/upload/${token}`
    const formData = new FormData();
    formData.append("file", uploadedFile);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    // this is temp loading till progress bar under construction 
    setUploadStarted(true)
    NotificationManager.info("Progress may not be shown","Warning",10000)
    xhr.upload.addEventListener("progress", handleUploadProgress);
    xhr.onreadystatechange = handleUploadComplete;
    xhr.send(formData);
    // fetch(url, {
    //   method: "POST",
    //   body: formData,
    // }).then((response) => response.json())
    //   .then((data)=>{
    //     if(data.status === false){
    //       NotificationManager.error('Unable to upload',"Error", 5000);
    //     }else{
    //       setUploadedUrl(data.url)
    //       NotificationManager.success('Uploaded Successfully',"Error", 5000);
    //     }
    //   })
    //   .catch((error) => {
    //     NotificationManager.error('Unable to upload',"Error", 5000);
    //   });
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    // resetting copy state because now user want to upload new file 
    setUploadedUrl(null)

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
  };

  return (
    <div
      className="upload-section w-100"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input" className=" transparent-container align-center flex-col">
        <h2>Upload</h2>
        <span className="material-symbols-outlined">upload</span>
        {uploadedFile ? (
          <div className="flex flex-col align-center justify-content-center">
            <p>Uploaded file: {uploadedFile.name}</p>
            <p>File size: {filesize(uploadedFile.size)}</p>
            {uploadedUrl ?(
              <MyButton text={"copy"} icon={"share"}  onClick={()=>handleCopy(uploadedUrl)}/>
              ):(
                <>
                {uploadStarted ?(

                  <div className="text-center">
                      <ReactLoading className="uploading-loading" type="cubes" color="var(--clr-primary-100)" height={32}/>
                      {uploadProgress?(
                        <h4 className="mt-50">{uploadProgress}% Uploaded</h4>  
                      ):(
                      <h4 className="mt-50">Uploading, Please wait..</h4>
                      )}
                  </div>
                ):(
                  <>
                  <ReCAPTCHA ref={captchaRef} sitekey="6Ld7Y4omAAAAAKhWv9p6tsp8-X_cA02FVADpR5JZ"/>
                  <MyButton  text="Upload" className="upload-btn" onClick={uploadToServer}/>
                  </>
                )}
                  
                </>
            )}
          </div>
        ) : (
          <>
            <p>Drag and drop a file here or click to browse</p>
          </>
        )}
        <input type="file" id="file-input" onChange={handleFileUpload} />
      </label>
    </div>
  );
}


function ServicesPage() {
  return (
    <div>
      <UploadFile/>
    </div>
  );
}

export default ServicesPage;