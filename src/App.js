import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import LiffComponents from './Components/LiffComponent'
function App(props) {
  const { params } = props
  const navigate = useNavigate()
  
  useEffect(() => {
    if(params === 'register') {
      navigate('/register')
    } else if (params === 'controller') {
      navigate('/liff-home')
    } else if (params === 'controller99-1'){
      navigate('/home2')
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <h1>Hello, ยินดีต้อนรับนะ :D</h1>
      <h1>{params}</h1>
      <LiffComponents/>
    </div>
  );  
}

export default App;
