import { useState ,useRef} from "react";
import MyButton from "../components/MyButton"
import Disclaimer from "../components/Disclaimer";
import "../styles/SearchPage.css"
import { NotificationManager } from "react-notifications";
import { handleCopy } from "./DownloadPage";
function SearchBar({currentInpRef,handleSearchInput,searchResult}) {
  
  
  const handleClearBtn = () => {
    currentInpRef.current.value = ""
  }

  return (
    <div className='search-container'>
      <div className='input-wrap'>
        <input 
          ref={currentInpRef}
          onChange={handleSearchInput}
          type="text" 
          name="search" 
          id="search" 
          placeholder="Search"
        />
        <div className="flex gap-100">
        <span class="material-symbols-outlined text-grey " onClick={handleClearBtn}>
          close
        </span>
        <span class="material-symbols-outlined"  onClick={searchResult}>
          search
        </span>
        </div>
      </div>

    </div>
  );
}
function DownloadContainer({name,size,link}){

  return (
    <section className="download-container | transparent-container flex-col">
      <div>
        <h1>{name}</h1>
      </div>
      <small>
        {size}
      </small>
      <div className="download-btns-search">
        <MyButton text={"Download"} href={link}/>
        <MyButton text={"Share"} icon={"share"} onClick={()=>handleCopy(link)}/>
      </div>
    </section>
  )
}

function SearchPage() {
  const [contentList, setContentList] = useState([]);
  const currentInpRef = useRef()
  const apikey = "gAAAAABkivIH_stHPq8U-03tYOfDQxA3cAmKqhfSRNDosvtHcBOPrCTXQ2fmYGuXsQxJe4Tj37jGpggX3sxCndDJTUeIkqKmlg=="
  const searchResultHandler = () =>{
    const seachQuery = currentInpRef.current.value
    NotificationManager.info(`${seachQuery}`,"Searching for ",1500)
    if(seachQuery.length >= 3){
      const url = `https://api.zerotwo.in/1068352349/search/${apikey}/${seachQuery}`
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setContentList(data.data)
      })
      .catch(erro =>{
        NotificationManager.error("Unable to communicate with server","Error",5000)
      });
  }else{
      NotificationManager.error("Minimun 3 letters are required","Error",5000)
    }
  }
 
  return (
    <div>
      <SearchBar currentInpRef={currentInpRef}  searchResult={searchResultHandler}></SearchBar>
      {contentList.length > 0 ? (
        <ul>
          {contentList.map((content, index) => (
            <li key={index}>
              <DownloadContainer name={content.name} size={content.size} link={content.weblink}/>
              </li>
          ))}
        </ul>
      ) : (
      <div className="text-center">
        <h1>Try searching with proper spell check!</h1>
      </div>
      )}

      <Disclaimer />
    </div>
  );
}

export default SearchPage;