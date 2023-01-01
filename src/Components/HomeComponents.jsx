import style from '../css/Home.module.css'
import {BsLightbulb, BsLightbulbOffFill} from 'react-icons/bs'
import { useState, useEffect }from 'react'
import axios from 'axios'
import { RotatingLines, Blocks, ProgressBar } from 'react-loader-spinner'
function HomeComponents(props) {


  // eslint-disable-next-line
  const {lineName, userId, pictureUrl} = props //ดึงค่าจาก LiffComponents มาจาก useContext
  const [statein, setStateIn] = useState([])  //ดึงข้อมูลจาก api อุปกรณ์มาเก็บไว้เป็น list 0 1 2
  const [loading, setLoading] = useState(false) // Icon loading เมื่อกดจะให้แสดง แล้วเมื่อโหลดเสร็จให้ปิด
  const fetchData=()=> {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API}/Items`)
    .then(response => {
      setStateIn(response.data)
      setLoading(false)
    })
    .catch(err => console.log(err))
  }
  const trickBtn=(id, active, lineName, homeName)=> {
    setLoading(true)
    axios
    .put(`${process.env.REACT_APP_API}/Change-state/${id}`,{active, lineName, homeName})
    .then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          fetchData();
          setLoading(false)
        }, 500);
      } else {
        setLoading(true)
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData();
  },[])

  return(
    <>
      {loading === false ? statein.map((home, index) => (
        <div className={style.HomeDiv}>
              <div key={index} className={style.HomeCom}>
                <h1>{home.name}</h1>
                <div onClick={()=>trickBtn(home.id, home.isActive, lineName, home.name)} className={style.button_css}>
                {loading === false ? home.id == 3 ? "สั่งประตูทำงาน" : (home.isActive === true ? <BsLightbulb className={style.Icons}/> : <BsLightbulbOffFill className={style.Icons}/>) : <RotatingLines/>}
                </div>
                <h5>{home.id == 3 ? "" : home.isActive === true ? 'สถานะ : ปิด' : 'สถานะ : เปิด'}</h5>
                <h5>{"สั่งทำงานโดย : " + home.userActive}</h5>
              </div>
            
        </div>
        )) : 
        <div className="container d-flex justify-content-center mt-5">
          <div style={{"padding-top": '60%'}}>
            <h1>กำลังโหลด..</h1>&nbsp;
            <ProgressBar
            height="150"
            width="150"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#000000'
            barColor = '#3385ff'
            />
          </div>
      </div>
      }
      </>
  )
}

export default HomeComponents