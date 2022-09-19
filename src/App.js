import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
// import Navigation from './Components/Navigation'
import DoorComponent from './Components/DoorComponent';
import { ThreeDots } from 'react-loader-spinner'
import LiffComponent from './Components/LiffComponent';
function App(props) {
  const { params } = props
  const navigator = useNavigate()
  console.log(props);

  useEffect(() => {
    // liffInit();
    if(params === 'register') {
      console.log(params);
      navigator('/register')
    } else if (params === 'controller') {
      navigator('/liff-home')
      console.log(params);
    } else if (params === 'controller99-1'){
      navigator('/home2')
      console.log(params);
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{'ชื่อจาก parameter'+ params}</h1>
      <h2>h2 นะ</h2>
      
      <LiffComponent/>
      {/* {params === 'controller99-1' ? <ThreeDots/> : <DoorComponent/>} */}
    </div>
  );  
}

export default App;
