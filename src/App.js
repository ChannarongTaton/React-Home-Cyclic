import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import liff from '@line/liff';
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
// import Navigation from './Components/Navigation'
import DoorComponent from './Components/DoorComponent';
function App(props) {
  const { params } = props
  let search = useLocation.search;
  const navigator = useNavigate()
  const nameId = new URLSearchParams(search).get(params)

  // if(params === 'register') {
  //   navigate('/register')
  // } else if (params === 'controller') {
  //   navigate('/liff-home')
  // } else if (params === 'controller99-1'){
  //   navigate('/home2')
  // }
  useEffect(() => {
    // liffInit();
    if(nameId === 'register') {
      navigator('/register')
    } else if (nameId === 'controller') {
      navigator('/liff-home')
    } else if (nameId === 'controller99-1'){
      navigator('/home2')
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{params}</h1>
      {/* {params === 'controller99-1' ? <DoorComponent/> : <LiffComponents/>} */}
      {/* <LiffComponents/> */}
      {/* <Navigation/> */}
    </div>
  );  
}

export default App;
