import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import DoorComponent from './Components/DoorComponent';
import HomeComponents from './Components/HomeComponents'
function App(props) {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)

    if(queryParams == 'register') {
        navigate('/register')
    }

    return (
    <div className="App">
        <h1>Hello, ยินดีต้อนรับนะ :D</h1>
        {queryParams == 'page=MyController' ? <HomeComponents {...props.value}/> : ''}
        {queryParams == 'page=Home2' ? <DoorComponent/> : ''}
    </div>
    );  
}

export default App;
