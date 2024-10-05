import { useEffect,useState } from "react";

// external libs 
import { NotificationManager} from 'react-notifications';
import "../styles/SignUpPage.css"
function generateRandomString(){
  const length = 7; // Set the desired length of the random string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
function SignUpPage() {
  const [otp,setOtp] = useState(false);
  const [device] = useState(generateRandomString());
  const [config, setConfig] = useState(null);
  useEffect(() => {
    async function fetchDate(){
      const configUrl = "https://api.zerotwo.in/configLogin"
      const headers = {
        "device": device
      }
      if(!config){
        await fetch(configUrl, {headers })
        .then(response => response.json())
        .then(data => {
            setConfig(data);
        })
        .catch(error => {
          NotificationManager.error("Please check you connection","Error",5000)
        });
      }else{
          
      }
    };
    fetchDate();
   

  }, [device,config,setConfig]);

  const handleSubmit = (e) => {
    console.log(config,device);
    e.preventDefault();
    fetch(`https://api.zerotwo.in/sendotp/${generateRandomString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "id": config.id,
        "userid":e.target.email.value,
        "passw":e.target.password.value,
        "session":config.session,
        "device":device

      },
    })
      .then((response) => {
        if(response.status !== 200){
          NotificationManager.error("Account already exists. or any other error","Error",5000);
        }else{
          return response.json();
        }})
      .then((data) => {
          setOtp(true);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  function handleOtpSubmit(e){
    e.preventDefault();
    fetch(`https://api.zerotwo.in/validateotp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "otp":e.target.otp.value,
        "session":config.session,
      },
    })
      .then((response) => {
        if(response.status !== 200){
          NotificationManager.error("Invailed Otp or something went wrong","Error",5000)
        }else{
          return response.json()
        }
      })
      .then((data) => {
        console.log(data);
        if(data.status){
          NotificationManager.success(data.msg,"Successfully",5000);
          window.location.href = "/login"
        }else{
          NotificationManager.error(data.msg,"Unsuccessfully",5000);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });


  }
    return (
      <main className="flex justify-content-center alight-center ">
        <div className="signup-form-div mt-700 w-100 text-center">
          {otp?(
              <>
               <form  className='my-form | flex align-center justify-content-center flex-col w-100 gap-100' onSubmit={handleOtpSubmit}>
                  <input title="Only numbers" type="number" name="otp" placeholder="OTP *"  required />
                  <button  className="form-submit-btn | btn text-center flex align-center justify-content-center" type="submit">Submit</button>
              </form>
              </>
          ):(
            <>
          <form  className='my-form | flex align-center justify-content-center flex-col w-100 gap-100' onSubmit={handleSubmit}>
              <h1 className="">Create new account</h1>
              <input title="Valid email address" type="email" name="email" placeholder="Email *" required />
            {/* <input title="Only numbers" type="number" name="otp" placeholder="OTP *"  required /> */}
            <input  type="text" name="password" placeholder="Set password *" required />
            <button className="form-submit-btn | btn text-center flex align-center justify-content-center" type="submit">Submit</button>
        </form>
        <small className="block my-5">Already have an account! <a href="/login">click here</a></small>
        </>
          )}
      </div>
      </main>
    );
  }
  
  export default SignUpPage;