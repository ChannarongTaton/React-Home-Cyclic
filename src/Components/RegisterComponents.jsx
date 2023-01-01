import React, { useState, useEffect, } from 'react'
import ProfileJPG from '../assets/profile.jpg'
import style from '../css/Register.module.css'
import liff from '@line/liff/dist/lib'
import axios from 'axios'
import { Blocks, CirclesWithBar } from 'react-loader-spinner'
function RegisterComponents() {

  const [linedata, setLineData] = useState({
    nickName: '',
    displayName: '',
    userId: '',
    pictureUrl: ProfileJPG,
    userStatus:''
  })

  const [api, setApi] = useState('')
  const [loading, setLoading] = useState(false)
  const {nickName, displayName, userId, pictureUrl, userStatus} = linedata
  
  const liffLogin= async () => {

    await liff.init({liffId: process.env.REACT_APP_LIFFID})
    .catch(err => console.log(err))

    liff.ready.then(() => {
        if(!liff.isLoggedIn()){
            liff.login()
        }

        liff.getProfile().then(profile => {
            let {displayName, userId, pictureUrl} = profile

            if (pictureUrl === '') {
                setLineData({
                  displayName: displayName,
                    userId: userId,
                    pictureUrl: ProfileJPG,
                    nickName: '',
                    userStatus:'wait'
                })
                setLoading(true)
            } else {
                setLineData({
                  displayName: displayName,
                    userId: userId,
                    pictureUrl: pictureUrl,
                    nickName: '',
                    userStatus:'wait'
                })
                setLoading(true)
            }
        })

    })

    const isFriend = await getFriend();
    if(!isFriend) {
        window.location = 'https://lin.ee/M9Ya7UI'
    }
}

async function getFriend() {
    const friend = await liff.getFriendship()
    return friend.friendFlag
}

const inputValue=name=>e=> {
  setLineData({...linedata,[name]:e.target.value})
}


const sendData = (e) => {
  e.preventDefault()
  setLoading(false)
  axios.post(`${process.env.REACT_APP_API_USER}/create`,
  { nickName, displayName, userId, pictureUrl, userStatus})
  .then(response => {
    setLoading(false)
    if(response.status === 200) {
      setApi('บันทึกเรียบร้อย')
      liff.closeWindow()
    }
  })
  .catch(err => {
    setApi(err)
    setLoading(false)
  })
}

useEffect(()=> {
  liffLogin()
  // eslint-disable-next-line
},[])
  return (
    <div>
      <div className={style.Circles}>
        {loading == true ? '' : <Blocks visible={true} height="150" width="150"
        ariaLabel="blocks-loading" wrapperStyle={{}}
        wrapperClass="blocks-wrapper"/> }
      </div>
      {loading == false ? '' : <div className={style.container}>
        <h1>{api}</h1>
        <h1 style={{"margin-top": '100px', "margin-bottom": '30px'}}>ใส่ชื่อเล่น</h1>
          <form className={style.form} onSubmit={sendData}>
            <div className={style.form_control}>
              <label className={style.label}>ชื่อเล่น</label>
              <input className={style.input} type="text" value={nickName} onChange={inputValue('nickName')} required/>
            </div>
            <button type='submit'>เข้าใช้งาน</button>
          </form>
      </div>}
    </div>
  )
}

export default RegisterComponents