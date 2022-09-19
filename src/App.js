import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
// import Navigation from './Components/Navigation'
import DoorComponent from './Components/DoorComponent';
import { ThreeDots } from 'react-loader-spinner'
function App(props) {
  const { params } = props
  let search = useLocation.search;
  const navigator = useNavigate()
  const nameId = new URLSearchParams(search).get(params)


  useEffect(() => {
    // liffInit();
    if(nameId === 'register') {
      console.log(nameId);
      navigator('/register')
    } else if (nameId === 'controller') {
      navigator('/liff-home')
      console.log(nameId);
    } else if (nameId === 'controller99-1'){
      navigator('/home2')
      console.log(nameId);
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{params}</h1>
      <h1>{nameId}</h1>
      {params === 'controller99-1' ? <DoorComponent/> : <ThreeDots/>}
    </div>
  );  
}

export default App;
