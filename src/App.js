import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
import Navigation from './Components/Navigation'
import axios from 'axios';

// import DoorComponent from './Components/DoorComponent';
// import { ThreeDots } from 'react-loader-spinner'
function App() {
  let search = useLocation().search;
  const navigator = useNavigate()
  const queryParams = new URLSearchParams(search).get('liff.state')
  // const { params } = props
  console.log(queryParams);
  const fetchData=()=> {
    axios.get(`${process.env.REACT_APP_API}/Items`)
    .then(response => {
      
    })
    .catch(err => console.log(err))
    
  }
  useEffect(() => {
    // liffInit();
    fetchData()
    if(queryParams === 'register') {
      navigator('/register')
    } else if (queryParams === '%3Fpage%3Dcontroller') {
      navigator('/liff-home')
    } else if (queryParams === 'controller99-1'){
      navigator('/home2')
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{'ชื่อจาก parameter '+ queryParams}</h1>
      <h2>h2 นะ</h2>
      {/* <LiffComponents/> */}
      {/* {params === 'controller99-1' ? <ThreeDots/> : <DoorComponent/>} */}
    </div>
  );  
}

export default App;
