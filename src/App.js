import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import DoorComponent from './Components/DoorComponent';
import HomeComponents from './Components/HomeComponents'
function App(props) {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    // eslint-disable-next-line
    if(queryParams == 'page=register') {
        navigate('/register')
    // eslint-disable-next-line
    } else if(queryParams == 'page=list-users') {
        navigate('/list-users')
    }
    return (
    <div className="App">
        {queryParams == 'page=MyController' ? <HomeComponents {...props.value}/> : ''}
        {queryParams == 'page=Home2' ? <DoorComponent {...props.value}/> : ''}
        {/* {queryParams == 'page=Home2' ? <DoorComponent/> : ''} */}
    </div>
    );  
}

export default App;
