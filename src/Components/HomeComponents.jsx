import style from '../css/Home.module.css'
import {BsLightbulb, BsLightbulbOffFill} from 'react-icons/bs'
import { useState, useEffect }from 'react'
import axios from 'axios'
import { RotatingLines, Blocks } from 'react-loader-spinner'
function HomeComponents(props) {


  // eslint-disable-next-line
  const {lineName, userId, pictureUrl} = props //ดึงค่าจาก LiffComponents มาจาก useContext
  const [statein, setStateIn] = useState([])  //ดึงข้อมูลจาก api อุปกรณ์มาเก็บไว้เป็น list 0 1 2
  const [loading, setLoading] = useState(false) // Icon loading เมื่อกดจะให้แสดง แล้วเมื่อโหลดเสร็จให้ปิด
  const fetchData=()=> {
    axios.get(`${process.env.REACT_APP_API}/Items`)
    .then(response => {
      setStateIn(response.data)
    })
    .catch(err => console.log(err))
    
  }
  const trickBtn=(id, active, lineName)=> {
    setLoading(true)
    axios
    .put(`${process.env.REACT_APP_API}/Change-state/${id}`,{active, lineName})
    .then(response => {
      console.log(response.data.isActive);
      if (response.status === 200) {
        setTimeout(() => {
          fetchData()
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
      <div className={style.HomeDiv}>
        <div>
        {loading === false ? statein.map((home, index) => (
          <div key={index} className={style.HomeCom}>
              <h1>{home.name}</h1>
              <div onClick={()=>trickBtn(home.id, home.isActive, lineName)} className={style.button_css}>
                {loading === false ? (home.isActive === true ? <BsLightbulb className={style.Icons}/> : <BsLightbulbOffFill className={style.Icons}/>) : <RotatingLines/>}
              </div>
              <h5>{home.isActive === true ? 'สถานะ : ปิด' : 'สถานะ : เปิด'}</h5>
              <h5>{"สั่งทำงานโดย : " + home.userActive}</h5>
          </div>
        )) : 
        <div className={style.Circles}>
          <Blocks visible={true} height="150" width="150"
          ariaLabel="blocks-loading" wrapperStyle={{}}
          wrapperClass="blocks-wrapper"/>
        </div>
        }
        </div>
      </div>
  )
}

export default HomeComponents