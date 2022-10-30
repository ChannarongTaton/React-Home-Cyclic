import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import RegisterComponents from './Components/RegisterComponents'
import DoorComponent from './Components/DoorComponent'
import ListUserComponent from './Components/ListUserComponent'
import liff from '@line/liff'
import ProfileJPG from './assets/profile.jpg'
import { useState, useEffect } from 'react'

const MyRoute=()=> {
    const [linedata, setLineData] = useState({
        lineName: '',
        userId: '',
        pictureUrl: ProfileJPG,
        nickName: '',
        userStatus: 'wait',
    })
    const liffLogin= async () => {
        await liff.init({liffId: process.env.REACT_APP_LIFFID})
        .catch(err => console.log(err))
        liff.ready.then(() => {
            if(!liff.isLoggedIn()){
                liff.login()
            }
            liff.getProfile().then(profile => {
                let {displayName, userId, pictureUrl} = profile
                setLineData({
                    lineName: displayName,
                    userId: userId,
                    pictureUrl: pictureUrl,
                    nickName: '',
                    userStatus:'wait'
                })
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
    useEffect(() => {
        // liffLogin()
        //   eslint-disable-next-line
    },[])
    // console.log(linedata.lineName + " from Routes")
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<App value={linedata}/>}/>
                    <Route path="/register" element={<RegisterComponents/>}/>
                    <Route path="/home2" element={<DoorComponent/>}/>
                    <Route path="/list-users" element={<ListUserComponent/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default MyRoute;