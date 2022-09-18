import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
import Navigation from './Components/Navigation'
import DoorComponent from './Components/DoorComponent';
function App(props) {
  const { params } = props
  const navigate = useNavigate()
  if(params === 'register') {
    navigate('/register')
  } else if (params === 'controller') {
    navigate('/liff-home')
  } else if (params === 'controller99-1'){
    navigate('/home2')
  }
  // useEffect(() => {
  //   if(params === 'register') {
  //     navigate('/register')
  //   } else if (params === 'controller') {
  //     navigate('/liff-home')
  //   } else if (params === 'controller99-1'){
  //     navigate('/home2')
  //   }
  //   // eslint-disable-next-line
  // },[])
  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{params}</h1>
      <DoorComponent/>
      {/* <LiffComponents/> */}
      {/* <Navigation/> */}
    </div>
  );  
}

export default App;
