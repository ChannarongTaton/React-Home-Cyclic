import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import LiffComponents from './Components/LiffComponent'
import DoorComponent from './Components/DoorComponent';
import RegisterComponents from './Components/RegisterComponents';
import ProfileJPG from './assets/profile.jpg'
import { ThreeDots } from 'react-loader-spinner'
function App(props) {
  const { params } = props
  let search = useLocation().search;
  const navigator = useNavigate()

  const [linedata, setLineData] = useState({
    lineName: '',
    userId: '',
    pictureUrl: ProfileJPG,
    nickName: '',
    userStatus: 'wait'
})

  useEffect(() => {
    // liffLogin() 
    if(params === '?page=register') {
      navigator('/register')
    } else if (params === '?page=controller') {
      navigator('/liff-home')
    } else if (params === '?page=controller99-1'){
      navigator('/home2')
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      {params === '?page=register' ? <RegisterComponents/> : <ThreeDots/>}
      {params === '?page=controller' ? <LiffComponents/> : <ThreeDots/>}
      {params === '?page=controller99-1' ? <DoorComponent/> : <ThreeDots/>}
      {/* <h1>{'props '+ params}</h1>
      <h1>{'search '+ search}</h1> */}
      {/* <h2>h2 นะ</h2> */}
      {/* <LiffComponents/> */}
      {/* {params === 'controller99-1' ? <ThreeDots/> : <DoorComponent/>} */}
    </div>
  );  
}

export default App;
