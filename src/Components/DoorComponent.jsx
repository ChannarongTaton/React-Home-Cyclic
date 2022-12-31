import React, { useState, useEffect } from 'react'
import style from '../css/Door.module.css';
// import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import ProfileJPG  from '../assets/profile.jpg'
import { Blocks } from 'react-loader-spinner'
function DoorComponent(props) {
// eslint-disable-next-line
const {lineName, userId, pictureUrl} = props //ดึงค่าจาก LiffComponents มาจาก useContext
  const [loading, setLoading] = useState(false)
  const [statein, setStateIn] = useState([])
  const [linedata, setLineData] = useState({
    nickName: '',
    lineName: '',
    userId: '',
    pictureUrl: ProfileJPG,
    userStatus:''
})
// eslint-disable-next-line
  // const {nickName, lineName, userId, pictureUrl, userStatus} = linedata
  var homeName = 'ประตู'
  const fetchData=()=> {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API}/Item/${3}`)
    .then(response => {
      setStateIn(response.data)
    })
    .catch(err => console.log(err))
  }
  
  const trickBtn=(id, active, lineName)=> {
    setLoading(true)
    axios
    .put(`${process.env.REACT_APP_API}/Change-state/${id}`,{active, lineName, homeName})
    .then(response => {
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
    fetchData()
    // eslint-disable-next-line
  },[])

  return (
    <div>
      <div className={style.Circles}>
      </div>
      <div className={style.settingDoorCom}>
            <div className={style.DoorCom}>
          <button onClick={()=>trickBtn(statein.id, statein.isActive, lineName, homeName)} className={style.button1}>เปิด/ปิด ประตูกดปุ่มนี้</button>
            </div> 
        <p>*กดปุ่มเดียว*</p>
      </div>
    </div>

  )
}

export default DoorComponent