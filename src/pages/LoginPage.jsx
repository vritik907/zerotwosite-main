import { useEffect,useState } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from 'universal-cookie';
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
function LoginPage() {
  const [device] = useState(generateRandomString());
  const [config, setConfig] = useState(null);
  useEffect(() => {
    console.log(device);
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
    function handleSubmit(e){
      e.preventDefault();
      function login(){fetch(`https://api.zerotwo.in/login/${generateRandomString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "id": config.id,
          "username":e.target.email.value,
          "password":e.target.password.value,
          "session":config.session
  
        },
      })
        .then((response) => {
          console.log(response.status)
          if(response.status !== 200){
            NotificationManager.error("Something went wrong","Try again",5000);
          }else{
            return response.json();
          }
        })
        .then((data) => {
          console.log("login data",data);
          const cookies = new Cookies(); 
          cookies.set('userCred', data, { path: '/' });
          cookies.set('ids', {"id":config.id,"device":device}, { path: '/' });
          // setting data to cookies 
          NotificationManager.success("Logged in successfully","SucessFull",5000);
          window.location.href = "/"
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });}
      // getting user data after loged in   
      login();

            

    }
    return (
      <main className="flex justify-content-center alight-center ">
        <div className="signup-form-div mt-700 w-100 text-center">
          <h1 className="">Login</h1>
          <form  className='my-form | flex align-center justify-content-center flex-col w-100 gap-100' onSubmit={handleSubmit}>
            <input title="Valid email address" type="email" name="email" placeholder="Email *" required />
            <input  type="text" name="password" placeholder="Set password *" required />
            <button className="form-submit-btn | btn text-center flex align-center justify-content-center" type="submit">Submit</button>
        </form>
        <small className="block my-5">Create new account! <a href="/signup">click here</a></small>
      </div>
      </main>
    );
  }
  
  export default LoginPage;